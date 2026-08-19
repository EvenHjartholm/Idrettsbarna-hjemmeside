import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import WelcomePageRenderer, { WelcomePageData } from './WelcomePageRenderer';

const SITE_URL = 'https://www.læråsvømme.no';

/**
 * Versjonering av velkomstsidene
 * ─────────────────────────────────────────────────────────────
 * Hver velkomstside er en liste av versjoner. Ved en større
 * innholdsoppdatering legger vi til en NY versjon øverst i listen
 * med dagens dato — den gamle blir stående urørt.
 *
 * Lenker kan ha ?v=DD-MM-ÅÅÅÅ (datoen velkomstmailen ble sendt).
 * Da vises versjonen som gjaldt på den datoen. Uten ?v vises alltid
 * nyeste versjon.
 *
 * Små rettelser (vesentlige feil) redigeres direkte i den aktuelle
 * versjonen — det er meningen at gamle versjoner skal kunne rettes.
 */
export interface WelcomeVersion {
  /** Datoen versjonen begynte å gjelde (ISO: ÅÅÅÅ-MM-DD). */
  effectiveFrom: string;
  /** Kort notat om hva som endret seg. Vises ikke på siden. */
  note?: string;
  data: WelcomePageData;
}

const NORSK_DATO = /^(\d{2})-(\d{2})-(\d{4})$/;  // 19-08-2026
const ISO_DATO = /^(\d{4})-(\d{2})-(\d{2})$/;    // 2026-08-19

/**
 * Tolker ?v=-datoen. Godtar norsk DD-MM-ÅÅÅÅ (formatet portalen bruker)
 * og ISO ÅÅÅÅ-MM-DD. De to kan ikke forveksles, siden årstallet står i
 * hver sin ende. Returnerer alltid ISO, slik at datoer kan sammenlignes
 * som ren tekst. Ugyldig dato gir null → nyeste versjon.
 */
export function parseVersionDate(requested?: string | null): string | null {
  if (!requested) return null;

  let y: string, m: string, d: string;
  const norsk = NORSK_DATO.exec(requested);
  const iso = ISO_DATO.exec(requested);
  if (norsk) {
    [, d, m, y] = norsk;
  } else if (iso) {
    [, y, m, d] = iso;
  } else {
    return null;
  }

  // Fanger både umulige tall (32-13-2026) og datoer som ikke finnes (31-02-2026)
  const dato = new Date(`${y}-${m}-${d}T00:00:00Z`);
  if (
    Number.isNaN(dato.getTime()) ||
    dato.getUTCFullYear() !== Number(y) ||
    dato.getUTCMonth() + 1 !== Number(m) ||
    dato.getUTCDate() !== Number(d)
  ) {
    return null;
  }
  return `${y}-${m}-${d}`;
}

/**
 * Finner versjonen som gjaldt på den forespurte datoen: den nyeste
 * versjonen med effectiveFrom <= datoen. Er datoen eldre enn alle
 * versjoner, brukes den eldste. Uten (eller med ugyldig) dato brukes
 * nyeste versjon.
 */
export function resolveWelcomeVersion(
  versions: WelcomeVersion[],
  requested?: string | null,
): { version: WelcomeVersion; isLatest: boolean } {
  const sorted = [...versions].sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom));
  const latest = sorted[0];
  const dato = parseVersionDate(requested);
  if (!dato) {
    return { version: latest, isLatest: true };
  }
  const match = sorted.find(v => v.effectiveFrom <= dato) ?? sorted[sorted.length - 1];
  return { version: match, isLatest: match === latest };
}

const MONTHS = ['januar', 'februar', 'mars', 'april', 'mai', 'juni',
  'juli', 'august', 'september', 'oktober', 'november', 'desember'];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${Number(d)}. ${MONTHS[Number(m) - 1]} ${y}`;
}

/** Diskret stripe øverst når man ser en arkivert versjon. */
function ArchiveNotice({ effectiveFrom, canonicalPath }: { effectiveFrom: string; canonicalPath: string }) {
  return (
    <div
      className="no-print"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        backgroundColor: 'rgba(240,192,64,0.95)', color: '#1a1a2e',
        padding: '10px 20px', textAlign: 'center', fontSize: '14px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backdropFilter: 'blur(6px)',
      }}
    >
      Du ser informasjonen slik den gjaldt fra {formatDate(effectiveFrom)}.{' '}
      <a href={canonicalPath} style={{ color: '#1a1a2e', fontWeight: 600, textDecoration: 'underline' }}>
        Vis nyeste versjon
      </a>
    </div>
  );
}

export interface VersionedWelcomePageProps {
  versions: WelcomeVersion[];
  /** Den «rene» adressen uten query — kanonisk URL for søkemotorer. */
  canonicalPath: string;
  title: string;
  description: string;
}

/**
 * SEO: kun den rene adressen skal være søkbar. Alle varianter med
 * query-streng (?v=… for datert versjon, ?barn=… for personalisering)
 * får noindex, og canonical peker alltid tilbake til den rene adressen.
 */
const VersionedWelcomePage: React.FC<VersionedWelcomePageProps> = ({
  versions, canonicalPath, title, description,
}) => {
  const [searchParams] = useSearchParams();
  const { version, isLatest } = resolveWelcomeVersion(versions, searchParams.get('v'));
  const hasQuery = Array.from(searchParams.keys()).length > 0;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}${canonicalPath}`} />
        {hasQuery ? <meta name="robots" content="noindex, follow" /> : null}
      </Helmet>
      {!isLatest && <ArchiveNotice effectiveFrom={version.effectiveFrom} canonicalPath={canonicalPath} />}
      <WelcomePageRenderer data={version.data} />
    </>
  );
};

export default VersionedWelcomePage;
