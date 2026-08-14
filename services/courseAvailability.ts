/**
 * Live plasstall fra portalen.
 *
 * Portalen eksponerer én smal funksjon, `get_public_course_availability()`,
 * som returnerer *kun* tall — web_key, ledige plasser og antall på venteliste.
 * Ingen navn, ingen id-er, ingen persondata. Den leser bak radsikkerheten via
 * SECURITY DEFINER, så tabellene forblir stengt for anon-nøkkelen.
 *
 * Kallet skjer klientside med vilje. Byggeskriptet prerenderer sidene, så et
 * kall på byggetidspunktet ville frosset tallene inn i HTML-en — akkurat det
 * problemet dette skal løse.
 */
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import type { ScheduleDay } from '../types';

/* Bruker prosjektets delte klient. Den har innebygde reserveverdier fordi
   .env ikke ligger i git — en egen klient bygget på import.meta.env alene ble
   `null` under bygg, og hele kallet forsvant som død kode. */

export interface CourseAvailability {
  availableSpots: number;
  waitlistCount: number;
}

type AvailabilityMap = Map<string, CourseAvailability>;

const TOM: AvailabilityMap = new Map();

/* Timeplanen vises flere steder samtidig — siden, modalen og påmeldingen.
   Uten deling ba hver av dem om sitt eget svar, og én sidelasting ble til
   åtte kall. Her deles ett svar mellom alle, med en kort levetid slik at
   tallene fornyes for den som blir lenge på siden. */
const LEVETID_MS = 60_000;

let hentet: AvailabilityMap = TOM;
let hentetTid = 0;
let pågående: Promise<AvailabilityMap> | null = null;
const lyttere = new Set<(m: AvailabilityMap) => void>();

async function hentFraPortalen(): Promise<AvailabilityMap> {
  try {
    const { data, error } = await supabase.rpc('get_public_course_availability');
    if (error || !Array.isArray(data)) return hentet;

    const m: AvailabilityMap = new Map();
    for (const rad of data as Array<{
      web_key: string;
      available_spots: number;
      waitlist_count: number;
    }>) {
      if (!rad?.web_key) continue;
      m.set(rad.web_key, {
        availableSpots: rad.available_spots,
        waitlistCount: rad.waitlist_count,
      });
    }
    return m;
  } catch {
    /* Nettverksfeil eller blokkert kall: behold det vi hadde. */
    return hentet;
  }
}

function sørgForFerskeTall(): Promise<AvailabilityMap> {
  const ferskt = Date.now() - hentetTid < LEVETID_MS;
  if (ferskt && hentet.size > 0) return Promise.resolve(hentet);
  if (pågående) return pågående;

  pågående = hentFraPortalen().then(m => {
    hentet = m;
    hentetTid = Date.now();
    pågående = null;
    for (const lytter of lyttere) lytter(m);
    return m;
  });

  return pågående;
}

/** Tomt kart til svaret er der — og hvis kallet feiler. */
export function useCourseAvailability(): AvailabilityMap {
  const [byKey, setByKey] = useState<AvailabilityMap>(hentet);

  useEffect(() => {
    let avbrutt = false;

    const lytter = (m: AvailabilityMap) => { if (!avbrutt) setByKey(m); };
    lyttere.add(lytter);

    sørgForFerskeTall().then(m => { if (!avbrutt) setByKey(m); });

    return () => { avbrutt = true; lyttere.delete(lytter); };
  }, []);

  return byKey;
}

/**
 * Slår live-tallene inn i timeplanen.
 *
 * Rader uten `webKey`, og rader vi ikke fikk svar for, beholder sitt
 * hardkodede `spots`. Null ledige blir «Venteliste», som er ordet resten av
 * siden allerede bruker for fullt kurs.
 */
export function medLivePlasstall(
  schedule: ScheduleDay[],
  live: AvailabilityMap,
): ScheduleDay[] {
  if (live.size === 0) return schedule;

  return schedule.map(day => ({
    ...day,
    sessions: day.sessions.map(session => {
      if (!session.webKey) return session;
      const treff = live.get(session.webKey);
      if (!treff) return session;

      return {
        ...session,
        spots: treff.availableSpots === 0 ? 'Venteliste' : treff.availableSpots,
      };
    }),
  }));
}
