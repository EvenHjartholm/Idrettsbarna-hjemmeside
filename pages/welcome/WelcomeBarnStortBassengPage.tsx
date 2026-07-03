import React from 'react';
import WelcomePageRenderer, { WelcomePageData } from './WelcomePageRenderer';

const barnStortData: WelcomePageData = {
  theme: 'dark_navy',
  hero_image_url: '/images/welcome/smabarn-hero.png',
  hero_title: 'Velkommen til svømmetrening!',
  hero_subtitle: 'Du er nå en del av treningsgruppen vår gjennom Asker Triatlonklubb 🏊\n\nVi gleder oss til å møte dere i 25-meters bassenget! Her kommer praktisk informasjon om treningen.',
  hero_subtitle_personal: 'Velkommen med {childName} til crawltrening! Du er nå en del av treningsgruppen vår gjennom Asker Triatlonklubb 🏊\n\nHer kommer praktisk informasjon om treningen.',
  course_location: '25-meters bassenget, Risenga svømmehall',
  sections: [
    {
      id: 'barn-medlemskap',
      type: 'practical_info',
      title: 'Medlemskap i Asker Triatlonklubb',
      items: [
        { title: 'Steg 1: Registrer deg', body: 'Gå til Min Idrett og registrer medlemskap i Asker Triatlonklubb:\n\nhttps://www.minidrett.no/medlemskap/704489' },
        { title: 'Steg 2: Betal treningsavgift', body: 'Betal treningsavgiften via Min Idrett. Dersom treningsavgiften ikke er tilgjengelig for registrering ennå, vil du motta en e-post så snart den er klar.' },
        { title: 'Viktig!', body: 'All svømmeaktivitet i 25-meters bassenget arrangeres gjennom Asker Triatlonklubb (www.askertri.no). Medlemskap og betalt treningsavgift er påkrevd for å delta.' },
      ],
    },
    {
      id: 'barn-for-kursdag',
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
      id: 'barn-utstyr',
      type: 'practical_info',
      title: 'Utstyr og bekledning',
      items: [
        { title: 'Tettsittende badebukse/drakt', body: 'Bruk tettsittende badebukse eller badedrakt. Ingen badeshorts! Løse shorts skaper mye motstand i vannet og er ikke tillatt.' },
        { title: 'Svømmebriller', body: 'Gode svømmebriller er viktig for å trene crawlteknikk.' },
        { title: 'Badehette', body: 'Badehette anbefales, spesielt ved langt hår.' },
        { title: 'Drikkeflaske', body: 'Ha med drikkeflaske med vann til treningsøkten.' },
      ],
    },
    {
      id: 'barn-dusj',
      type: 'practical_info',
      title: 'Dusj og hygiene',
      items: [
        { title: 'Obligatorisk dusj', body: 'En grundig dusj uten klær er obligatorisk før dere går i bassenget.' },
      ],
    },
    {
      id: 'barn-inngang',
      type: 'practical_info',
      title: 'Inngangsbillett',
      items: [
        { title: 'Barn', body: 'Barnet betaler inngangsbillett.' },
        { title: 'Foreldre/foresatte', body: 'Foreldre venter på land eller tribunen — det er gratis å se på fra land.' },
        { title: 'Tips', body: 'Klippekort er ofte det rimeligste alternativet for treningsdagene.' },
      ],
      footer_text: 'Inngang kjøpes direkte på Risenga svømmehall.',
    },
    {
      id: 'barn-for-under',
      type: 'before_during',
      title: 'Før og under treningen',
      steps: [
        { title: 'Ankomst', body: 'Møt opp 10–15 minutter før. Barnet skifter til badeklær og dusjer før det går mot bassenget.' },
        { title: 'Ved bassenget', body: 'Barnet møter instruktøren ved bassengkanten i 25-meters bassenget. Foresatte kan følge med fra tribunen.' },
        { title: 'Under treningen', body: 'Følg instruktørens anvisninger. Barnet trener crawlteknikk tilpasset sitt nivå.' },
      ],
    },
    {
      id: 'barn-undervann',
      type: 'photography',
      title: 'Undervannsfotografering på treningen',
      body: 'Vi tar undervannsbilder i løpet av treningsperioden – minneverdige øyeblikk under vann!',
      items: [
        { title: 'Gratis å ta', body: 'Bildene er gratis å ta, og etter redigeringen får dere en link til prøvebildene.' },
        { title: 'Valgfritt å kjøpe', body: 'Dere kan deretter velge å kjøpe bildene.' },
        { title: 'Hvem tar bildene?', body: 'Lotte dykker barna mens Even fotograferer ettersom han er fotograf også.' },
      ],
    },
    {
      id: 'barn-vilkar',
      type: 'terms',
      title: 'Vilkår',
      items: [
        { title: 'Medlemskap påkrevd', body: 'All svømmeaktivitet i 25-meters bassenget arrangeres gjennom Asker Triatlonklubb. Medlemskap og betalt treningsavgift via Min Idrett er påkrevd for å delta.' },
        { title: 'Bindende påmelding', body: 'Påmeldingen til svømmetrening er bindende. Dersom bassengene stenges av årsaker utenfor Asker Triatlonklubb sin kontroll (force majeure), refunderes ikke treningsavgiften.' },
        { title: 'Prisregulering', body: 'Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til treningsdeltakerne.' },
        { title: 'Avmelding', body: 'Ved avmelding før treningsstart, hvis vi finner en erstatter, påløper et gebyr på kr 500. Uten erstatter er påmeldingen fortsatt gjeldende.' },
      ],
    },

    {
      id: 'barn-kontakt',
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

const WelcomeBarnStortBassengPage: React.FC = () => <WelcomePageRenderer data={barnStortData} />;
export default WelcomeBarnStortBassengPage;
