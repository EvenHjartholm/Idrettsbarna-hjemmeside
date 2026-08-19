import React from 'react';
import { WelcomePageData } from './WelcomePageRenderer';
import VersionedWelcomePage, { WelcomeVersion } from './versioning';

/**
 * Velkomstside for barnekursene i varmtvannsbassenget
 * (Barn nybegynner og Barn øvet). Innholdet er det samme som på
 * småbarnsvømming — foresatte er med i vannet på begge.
 */
const barnekursData: WelcomePageData = {
  theme: 'dark_purple',
  hero_image_url: '/images/welcome/smabarn-hero.png',
  hero_title: 'Velkommen til svømmekurs!',
  hero_subtitle: 'Vi gleder oss til å møte dere og gi dere en morsom, trygg og lærerik opplevelse i vannet.\n\nHer kommer praktisk informasjon om kurset.',
  hero_subtitle_personal: 'Velkommen til våre kurs med {childName}! Vi gleder oss til å møte dere og gi dere en morsom, trygg og lærerik opplevelse i vannet.',
  parentInWater: true,
  course_location: 'Varmtvannsbassenget, Risenga svømmehall',
  sections: [
    {
      id: 'barnekurs-for-kursdag',
      type: 'practical_info',
      title: 'Før første kursdag',
      items: [
        { title: 'Ekstra tid', body: 'Beregn gjerne litt ekstra tid første gang, så dere rekker å finne fram og komme i ro.' },
        { title: 'Vent på land', body: 'Vent ved benkene på land til instruktøren starter timen. Ikke gå i vannet på egen hånd før oppstart.' },
        { title: 'Rolig miljø', body: 'Vi ønsker et rolig miljø rundt bassenget – barna trives best når det ikke blir for mye lyd og stress.' },
        { title: 'Svømmebriller', body: 'Svømmebriller for store og små vil vi anbefale å ha med.' },
      ],
    },
    {
      id: 'barnekurs-dusj',
      type: 'practical_info',
      title: 'Dusj og hygiene',
      items: [
        { title: 'Obligatorisk dusj', body: 'En grundig dusj uten klær er obligatorisk før dere går i bassenget.' },
      ],
    },
    {
      id: 'barnekurs-inngang',
      type: 'practical_info',
      title: 'Inngangsbillett',
      items: [
        { title: '0–2 år', body: 'Voksen betaler inngang, og barnet følger gratis inn.' },
        { title: '3–5 år', body: 'Kun barnet betaler inngangsbillett ved kurs. Den voksne ledsageren går gratis. Kun én ledsager per barn.' },
        { title: 'Fra 6 år', body: 'Voksen og barn betaler inngang.' },
        { title: 'Tips', body: 'Hvis dere skal svømme ofte utenom kurs også, kan månedskort være rimeligst. Hvis dere kun skal være med på kursdagene, er klippekort det beste alternativet.' },
      ],
      footer_text: 'Det er gratis å se på fra land.',
    },
    {
      id: 'barnekurs-undervann',
      type: 'photography',
      title: 'Undervannsfotografering på kursene',
      body: 'Vi tar undervannsbilder i løpet av kursrunden – minneverdige øyeblikk under vann!',
      items: [
        { title: 'Gratis å ta', body: 'Bildene er gratis å ta, og etter redigeringen får dere en link til prøvebildene.' },
        { title: 'Valgfritt å kjøpe', body: 'Dere kan deretter velge å kjøpe bildene.' },
        { title: 'Hvem tar bildene?', body: 'Lotte dykker babyene/barna mens Even fotograferer ettersom han er fotograf også.' },
      ],
    },
    {
      id: 'barnekurs-faktura',
      type: 'invoice_parking',
      title: 'Faktura og parkering',
      items: [
        { title: 'Fakturainformasjon', body: 'eFaktura skal være sendt sammen med påmeldingen. Om du ikke finner den, sjekk e-posten, spam-mappen eller kontakt oss ved manglende faktura.' },
        { title: 'Parkering', body: 'Gratis parkering er tilgjengelig i noen timer utenfor Risenga, og om det er fullt er det parkering i kjelleren på Varner Arena (ishockeyhallen).' },
      ],
    },
    {
      id: 'barnekurs-vilkar',
      type: 'terms',
      title: 'Vilkår',
      items: [
        { title: 'Bindende påmelding', body: 'Påmeldingen til våre svømmekurs er bindende. Hvis bassengene stenges av årsaker utenfor Idrettsbarna Svøm og Foto AS sin kontroll (force majeure), refunderes ikke kursavgiften, og fakturaen forblir gjeldende.' },
        { title: 'Prisregulering', body: 'Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til kursdeltakerne. Vi håper dette ikke blir nødvendig, men må forholde oss til endringer som kan komme.' },
        { title: 'Avmelding', body: 'Ved avmelding før kursstart, hvis vi finner en erstatter, påløper et gebyr på kr. 500.' },
      ],
    },

    {
      id: 'barnekurs-kontakt',
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
  { effectiveFrom: '2026-08-19', note: 'Første versjon – skilt ut fra småbarnsvømming', data: barnekursData },
];

const WelcomeBarnekursPage: React.FC = () => (
  <VersionedWelcomePage
    versions={versions}
    canonicalPath="/velkommen/barnekurs"
    title="Velkommen til barnekurs | Idrettsbarna"
    description="Praktisk informasjon før oppstart på barnekursene i varmtvannsbassenget på Risenga: dusj og hygiene, inngangsbillett, undervannsfotografering, faktura, parkering og vilkår."
  />
);
export default WelcomeBarnekursPage;
