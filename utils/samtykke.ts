/**
 * Samtykke til sporing.
 *
 * Google Analytics, Google Ads og Meta-pikselen lå før som faste skript i
 * index.html. De lastet ved hver sidelasting, før noen hadde sagt ja. Etter
 * ekomloven må slike informasjonskapsler ha samtykke først.
 *
 * Nå ligger de her, og lastes bare når noen har sagt ja. Sier de nei, eller
 * ikke noe i det hele tatt, kjøres ingenting — og da finnes verken gtag eller
 * fbq i nettleseren. Sporingskallene rundt i koden sjekker at funksjonen
 * finnes før de brukes, så de blir stille av seg selv.
 *
 * Valget huskes i localStorage. Det er per nettleser, ikke per person, og det
 * er riktig her: samtykket gjelder akkurat den enheten kapslene settes på.
 */

export type Samtykke = 'ja' | 'nei';

const NOKKEL = 'idrettsbarna_samtykke';

/** Målinger som lastes når noen har sagt ja. */
const GA_ID = 'G-ZS8S8BG927';
const GOOGLE_ADS_ID = 'AW-876796903';
const META_PIKSEL_ID = '275364239776475';

/** Under prerendering finnes ingen nettleser. Da skal ingenting skje. */
const iNettleser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Hva brukeren har svart, eller null om de ikke har tatt stilling ennå.
 *
 * Leses i try/catch: i privat vindu eller med blokkerte informasjonskapsler
 * kan localStorage kaste. Da behandles det som «ikke svart», og vi sporer
 * ingenting.
 */
export function hentSamtykke(): Samtykke | null {
    if (!iNettleser()) return null;
    try {
        const lagret = window.localStorage.getItem(NOKKEL);
        return lagret === 'ja' || lagret === 'nei' ? lagret : null;
    } catch {
        return null;
    }
}

/** Sant bare når brukeren aktivt har sagt ja. */
export function harSagtJa(): boolean {
    return hentSamtykke() === 'ja';
}

/**
 * Informasjonskapslene Google og Meta setter, og som skal vekk når noen
 * sier nei. Navnene er faste hos leverandørene; _ga_* får en målings-id
 * bakpå og fanges av prefikset.
 */
const SPORINGSKAPSLER = ['_fbp', '_fbc', '_ga', '_gid', '_gcl_au', '_gcl_aw'];
const SPORINGSPREFIKS = ['_ga_'];

/**
 * Sletter kapslene Google og Meta har satt.
 *
 * Å slutte å laste skriptene er ikke nok. Sier noen nei etter først å ha
 * sagt ja — eller ombestemmer seg senere — ligger kapslene igjen, og Meta
 * kan fortsatt kjenne igjen nettleseren på enhver annen side med pikselen.
 * Et tilbaketrukket samtykke skal virke.
 *
 * Kapslene er satt på toppdomenet, så de må slettes både på verten og på
 * .domenet. Ellers blir de stående.
 */
function slettSporingskapsler(): void {
    if (!iNettleser()) return;
    const vert = window.location.hostname;
    const domener = [vert, '.' + vert, '.' + vert.replace(/^www\./, '')];
    const navn = document.cookie
        .split(';')
        .map(c => c.trim().split('=')[0])
        .filter(n => SPORINGSKAPSLER.includes(n) || SPORINGSPREFIKS.some(p => n.startsWith(p)));

    for (const n of new Set(navn)) {
        for (const d of new Set(domener)) {
            document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${d}`;
        }
        document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

/** Lagrer svaret. Sier de ja lastes sporerne; sier de nei ryddes kapslene. */
export function settSamtykke(svar: Samtykke): void {
    if (!iNettleser()) return;
    try {
        window.localStorage.setItem(NOKKEL, svar);
    } catch {
        // Kan ikke lagres i privat vindu. Sporerne lastes likevel for denne
        // økta hvis de sa ja — spørsmålet kommer bare igjen neste gang.
    }
    if (svar === 'ja') lastSporere();
    else slettSporingskapsler();
}

/**
 * Lar brukeren ombestemme seg. Svaret glemmes, kapslene ryddes, og
 * banneret kommer opp igjen ved neste sidelasting.
 *
 * Kapslene ryddes også her: å nullstille betyr at det ikke foreligger noe
 * samtykke akkurat nå, og da skal det heller ikke ligge sporingskapsler
 * igjen. Sier de ja på nytt, settes friske.
 */
export function nullstillSamtykke(): void {
    if (!iNettleser()) return;
    try {
        window.localStorage.removeItem(NOKKEL);
    } catch {
        // ignorer
    }
    slettSporingskapsler();
}

let lastet = false;

/**
 * Laster Google Analytics, Google Ads og Meta-pikselen.
 *
 * Kalles bare når samtykket er gitt — enten ved klikk, eller ved
 * sidelasting hvis brukeren sa ja tidligere.
 */
export function lastSporere(): void {
    if (!iNettleser() || lastet) return;
    lastet = true;

    // ── Google Analytics og Google Ads ──
    const gaSkript = document.createElement('script');
    gaSkript.async = true;
    gaSkript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(gaSkript);

    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    function gtag(...args: any[]) { w.dataLayer.push(args); }
    w.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
    gtag('config', GOOGLE_ADS_ID);

    // ── Meta-pikselen ──
    // Samme oppstartskode som Meta oppgir, skrevet om så den leses.
    const fbq: any = function (...args: any[]) {
        fbq.callMethod ? fbq.callMethod.apply(fbq, args) : fbq.queue.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = fbq;

    const metaSkript = document.createElement('script');
    metaSkript.async = true;
    metaSkript.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(metaSkript);

    fbq('init', META_PIKSEL_ID);
    fbq('track', 'PageView');
}

/**
 * Kjøres ved oppstart. Har brukeren sagt ja før, lastes sporerne uten at de
 * må svare på nytt.
 */
export function lastSporereHvisSamtykket(): void {
    if (harSagtJa()) lastSporere();
}
