import React from 'react';
import { WelcomePageData } from './WelcomePageRenderer';
import VersionedWelcomePage, { WelcomeVersion } from './versioning';

/**
 * Velkomstside for svømmetreningene på onsdager i 25-metersbassenget.
 *
 * VIKTIG: Disse treningene arrangeres av Asker Triatlonklubb, ikke av
 * Idrettsbarna. Treningsavgiften faktureres av klubben via Min Idrett.
 * Idrettsbarna stiller kun med instruktør. Avsenderforholdet er derfor
 * gjentatt i hero, i egen arrangørseksjon, i medlemskapsseksjonen og i
 * vilkårene — en deltaker skal ikke kunne lese siden uten å få det med seg.
 * Ikke tone dette ned ved senere redigering.
 */
const svommetreningData: WelcomePageData = {
  theme: 'dark_navy',
  hero_image_url: '/images/welcome/smabarn-hero.png',
  hero_title: 'Velkommen til svømmetrening!',
  hero_subtitle: 'Onsdagstreningene i 25-metersbassenget arrangeres av Asker Triatlonklubb 🏊\n\nDet er klubben som er arrangør, og treningsavgiften faktureres gjennom Min Idrett via Asker Triatlonklubb. Idrettsbarna stiller med instruktør på bassengkanten.\n\nHer kommer praktisk informasjon om treningen.',
  hero_subtitle_personal: 'Velkommen med {childName} til svømmetrening! Onsdagstreningene i 25-metersbassenget arrangeres av Asker Triatlonklubb 🏊\n\nDet er klubben som er arrangør, og treningsavgiften faktureres gjennom Min Idrett via Asker Triatlonklubb. Idrettsbarna stiller med instruktør på bassengkanten.\n\nHer kommer praktisk informasjon om treningen.',
  course_location: '25-metersbassenget, Risenga svømmehall — onsdager',
  sections: [
    {
      id: 'svommetrening-arrangor',
      type: 'practical_info',
      title: 'Hvem arrangerer treningen?',
      items: [
        { title: 'Asker Triatlonklubb er arrangør', body: 'Onsdagstreningene i 25-metersbassenget er Asker Triatlonklubb sitt tilbud, ikke en Idrettsbarna-trening. Klubben står for påmelding, medlemskap, treningsavgift og vilkår.\n\nwww.askertri.no' },
        { title: 'Treningsavgiften faktureres av klubben', body: 'Treningsavgiften faktureres gjennom Min Idrett via Asker Triatlonklubb. Du får altså ingen faktura fra Idrettsbarna for disse treningene.' },
        { title: 'Idrettsbarna stiller med instruktør', body: 'Even og Lotte er instruktører på bassengkanten. Spørsmål om selve treningen kan dere ta med oss — spørsmål om medlemskap, faktura og betaling går til Asker Triatlonklubb.' },
      ],
      footer_text: 'All svømmeaktivitet i 25-metersbassenget arrangeres gjennom Asker Triatlonklubb.',
    },
    {
      id: 'svommetrening-medlemskap',
      type: 'practical_info',
      title: 'Medlemskap i Asker Triatlonklubb',
      items: [
        { title: 'Steg 1: Registrer medlemskap', body: 'Gå til Min Idrett og registrer medlemskap i Asker Triatlonklubb:\n\nhttps://www.minidrett.no/medlemskap/704489' },
        { title: 'Steg 2: Betal treningsavgift', body: 'Treningsavgiften betales via Min Idrett, og faktureres av Asker Triatlonklubb. Dersom treningsavgiften ikke er tilgjengelig for registrering ennå, får du e-post så snart den er klar.' },
        { title: 'Begge deler er påkrevd', body: 'Både medlemskap og betalt treningsavgift må være på plass for å delta på onsdagstreningene.' },
        { title: 'Spørsmål om faktura?', body: 'Faktura og medlemskap håndteres av Asker Triatlonklubb via Min Idrett. Ta kontakt med klubben på www.askertri.no — ikke med Idrettsbarna.' },
      ],
    },
    {
      id: 'svommetrening-for-forste',
      type: 'practical_info',
      title: 'Før første treningsdag',
      items: [
        { title: 'Møt opp 10–15 minutter før', body: 'Beregn god tid slik at dere rekker å skifte og dusje før treningen starter.' },
        { title: 'Vent på land', body: 'Vent ved benkene på land til instruktøren starter timen. Ikke gå i vannet på egen hånd før oppstart.' },
        { title: 'Svømmebriller', body: 'Svømmebriller er et must! Sørg for å ha med gode svømmebriller.' },
        { title: 'Drikkeflaske', body: 'Ta med drikkeflaske — det er viktig å drikke vann selv om man er i vannet!' },
      ],
    },
    {
      id: 'svommetrening-utstyr',
      type: 'practical_info',
      title: 'Utstyr og bekledning',
      items: [
        { title: 'Tettsittende badebukse/drakt', body: 'Bruk tettsittende badebukse eller badedrakt. Ingen badeshorts! Løse shorts skaper mye motstand i vannet og er ikke tillatt.' },
        { title: 'Svømmebriller', body: 'Gode svømmebriller er viktig for å trene teknikk.' },
        { title: 'Badehette', body: 'Badehette anbefales, spesielt ved langt hår.' },
        { title: 'Drikkeflaske', body: 'Ha med drikkeflaske med vann til treningsøkten.' },
      ],
    },
    {
      id: 'svommetrening-dusj',
      type: 'practical_info',
      title: 'Dusj og hygiene',
      items: [
        { title: 'Obligatorisk dusj', body: 'En grundig dusj uten klær er obligatorisk før dere går i bassenget.' },
      ],
    },
    {
      id: 'svommetrening-inngang',
      type: 'practical_info',
      title: 'Inngangsbillett',
      items: [
        { title: 'Deltakeren', body: 'Deltakeren betaler inngangsbillett til svømmehallen. Denne kommer i tillegg til treningsavgiften til Asker Triatlonklubb.' },
        { title: 'Foreldre/foresatte', body: 'Foreldre venter på land eller tribunen — det er gratis å se på fra land.' },
        { title: 'Tips', body: 'Klippekort er ofte det rimeligste alternativet for treningsdagene.' },
      ],
      footer_text: 'Inngang kjøpes direkte på Risenga svømmehall, og er ikke en del av treningsavgiften.',
    },
    {
      id: 'svommetrening-for-under',
      type: 'before_during',
      title: 'Før og under treningen',
      steps: [
        { title: 'Ankomst', body: 'Møt opp 10–15 minutter før. Skift til badeklær og dusj før du går mot bassenget.' },
        { title: 'Ved bassenget', body: 'Møt instruktøren ved bassengkanten i 25-metersbassenget. Foresatte kan følge med fra tribunen.' },
        { title: 'Under treningen', body: 'Følg instruktørens anvisninger. Treningen er tilpasset nivået i gruppen.' },
      ],
    },
    {
      id: 'svommetrening-vilkar',
      type: 'terms',
      title: 'Vilkår',
      items: [
        { title: 'Vilkårene er Asker Triatlonklubb sine', body: 'Onsdagstreningene arrangeres av Asker Triatlonklubb, og vilkårene under gjelder mellom deltakeren og klubben.' },
        { title: 'Medlemskap påkrevd', body: 'All svømmeaktivitet i 25-metersbassenget arrangeres gjennom Asker Triatlonklubb. Medlemskap og betalt treningsavgift via Min Idrett er påkrevd for å delta.' },
        { title: 'Bindende påmelding', body: 'Påmeldingen til svømmetrening er bindende. Dersom bassengene stenges av årsaker utenfor Asker Triatlonklubb sin kontroll (force majeure), refunderes ikke treningsavgiften.' },
        { title: 'Prisregulering', body: 'Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til treningsdeltakerne.' },
        { title: 'Avmelding', body: 'Ved avmelding før treningsstart, hvis vi finner en erstatter, påløper et gebyr på kr 500. Uten erstatter er påmeldingen fortsatt gjeldende.' },
      ],
    },
    {
      id: 'svommetrening-kontakt',
      type: 'contact',
      title: 'Ekstra informasjon og kontakt',
    },
  ],
  contact_name: 'Even og Lotte',
  contact_phone: '41906445',
  contact_email: 'even@idrettsbarn.no',
  contact_website: 'www.læråsvømme.no',
  contact_photo_website: 'www.idrettsfotografen.no',
  social_links: {
    youtube: 'https://www.youtube.com/@idrettsbarna',
    facebook: 'https://www.facebook.com/lerosvomme',
    instagram: 'https://www.instagram.com/idrettsbarna',
  },
};

const versions: WelcomeVersion[] = [
  { effectiveFrom: '2026-08-26', note: 'Første versjon – onsdagstreningene i 25-metersbassenget', data: svommetreningData },
];

const WelcomeSvommetreningPage: React.FC = () => (
  <VersionedWelcomePage
    versions={versions}
    canonicalPath="/velkommen/svømmetrening"
    title="Velkommen til svømmetrening | Asker Triatlonklubb"
    description="Praktisk informasjon før oppstart på onsdagstreningene i 25-metersbassenget på Risenga. Treningene arrangeres av Asker Triatlonklubb; medlemskap og treningsavgift går via Min Idrett."
  />
);
export default WelcomeSvommetreningPage;
