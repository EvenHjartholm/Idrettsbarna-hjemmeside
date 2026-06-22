import React from 'react';
import WelcomePageRenderer, { WelcomePageData } from './WelcomePageRenderer';

const babyData: WelcomePageData = {
  theme: 'dark_navy',
  hero_image_url: '/images/welcome/baby-pdf/page1.jpg',
  hero_title: 'Velkommen til babysvømming!',
  hero_subtitle: 'Vi gleder oss til å se dere på kurs og gi dere en morsom, trygg og lærerik opplevelse i vannet.\n\nHer kommer litt praktisk informasjon før oppstart.',
  hero_subtitle_personal: 'Velkommen til kurs med {childName}! Vi gleder oss til å se dere på kurs og her kommer litt praktisk informasjon før oppstart 😊\n\nKjenner dere noen med babyer som vil være med, så tips gjerne videre om at det er fortsatt plass på enkelte av våre kurs.',
  parentInWater: true,
  sections: [
    {
      id: 'baby-praktisk',
      type: 'practical_info',
      title: 'Før første kursdag',
      items: [
        { title: 'Beregn ekstra tid', body: 'Beregn gjerne litt ekstra tid første gang, så dere rekker å finne fram og komme i ro.' },
        { title: 'Vent på land', body: 'Vent ved benkene på land til instruktøren starter timen. Ikke gå i vannet på egen hånd før oppstart.' },
        { title: 'Rolig miljø', body: 'Vi ønsker et rolig miljø rundt bassenget – babyene trives best når det ikke blir for mye lyd og stress.' },
      ],
    },
    {
      id: 'baby-dusj',
      type: 'practical_info',
      title: 'Dusj og hygiene',
      items: [
        { title: 'Obligatorisk dusj', body: 'En grundig dusj uten klær er obligatorisk før dere går i bassenget.' },
        { title: 'Badebleie', body: 'Baby må bruke badebleie eller badebukse (badebleie anbefales). Ha med ekstra i baggen – uhell kan skje 😊' },
      ],
    },
    {
      id: 'baby-tips',
      type: 'tips',
      title: 'Praktiske tips for babysvømming',
      items: [
        { icon: 'shopping_bag', title: 'IKEA-bærepose med liggematte', body: 'Ta gjerne med en IKEA-bærepose med liggematte. Det har vist seg å være praktisk for å frakte babyen til og fra dusjen og bassenget, og for å legge babyen på gulvet ved behov.' },
        { icon: 'goggles', title: 'Svømmebriller for voksne', body: 'Svømmebriller for voksne kan være fint – spesielt når vi dykker og dere vil se babyen under vann.' },
        { icon: 'stroller', title: 'Barnevogn', body: 'Barnevogn kan parkeres under trappen ved inngangen.' },
      ],
    },
    {
      id: 'baby-inngang',
      type: 'practical_info',
      title: 'Inngangsbillett',
      items: [
        { title: 'Baby (0–2 år)', body: 'Gratis. Voksen betaler inngang.' },
        { title: 'Tips', body: 'Hvis dere skal svømme ofte utenom kurs også, kan månedskort være rimeligst. Hvis dere kun skal være med på kursdagene, er klippekort det beste alternativet.' },
      ],
    },
    {
      id: 'baby-undervann',
      type: 'photography',
      title: 'Undervannsfotografering på kursene',
      image_url: '/images/welcome/baby-pdf/page7.jpg',
      body: 'Vi tar undervannsbilder i løpet av kursrunden – minneverdige øyeblikk under vann!',
      items: [
        { title: 'Gratis å ta', body: 'Bildene er gratis å ta, og etter redigeringen får dere en link til prøvebildene.' },
        { title: 'Valgfritt å kjøpe', body: 'Dere kan deretter velge å kjøpe bildene.' },
        { title: 'Hvem tar bildene?', body: 'Lotte dykker babyene/barna mens Even fotograferer ettersom han er fotograf også.' },
      ],
    },
    {
      id: 'baby-faktura',
      type: 'invoice_parking',
      title: 'Faktura og parkering',
      items: [
        { title: 'Fakturainformasjon', body: 'eFaktura for kursavgiften skal ha blitt sendt ut. Finner du den ikke, sjekk gjerne e-post/spam – eller ta kontakt, så hjelper vi raskt.' },
        { title: 'Parkering', body: 'Det er gratis parkering i noen timer utenfor Risenga svømmehall.' },
      ],
    },
    {
      id: 'baby-vilkar',
      type: 'terms',
      title: 'Vilkår',
      items: [
        { title: 'Bindende påmelding', body: 'Påmeldingen er bindende.' },
        { title: 'Force majeure', body: 'Ved stenging av basseng av årsaker utenfor vår kontroll (force majeure), refunderes ikke kursavgiften.' },
        { title: 'Prisregulering', body: 'Ved prisendringer fra kommunen kan det bli sendt ut en ekstra faktura.' },
        { title: 'Avmelding', body: 'Ved avmelding før kursstart: Hvis vi finner en erstatter, påløper et gebyr på kr. 500.' },
      ],
    },
    {
      id: 'baby-foto',
      type: 'photography',
      title: 'Vi tilbyr også portrettfotografering',
      image_url: '/images/welcome/baby-pdf/page8.jpg',
      body: 'Ved siden av svømmeskolen er vi også fotografer.',
      items: [
        { title: 'Nyfødt og baby', body: 'Vi tilbyr fotografering fra nyfødt. 1-årsbilder er veldig populært!' },
        { title: 'Familiebilder', body: 'Familiebilder er koselig – utendørs eller innendørs. Ta kontakt!' },
        { title: 'Bryllupsbilder', body: 'Om dere eller noen dere kjenner skal gifte seg – ta kontakt for å sette opp timer.' },
      ],
    },
    {
      id: 'baby-kontakt',
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

const WelcomeBabyPage: React.FC = () => <WelcomePageRenderer data={babyData} />;
export default WelcomeBabyPage;
