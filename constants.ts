import { DayOfWeek, ScheduleDay, ServiceItem } from './types';

export const APP_NAME = "Idrettsbarna Lær å Svømme";
export const TAGLINE = "Trygghet og glede i vannet";

/**
 * Felles lokasjonskonstanter – single source of truth for adresse, JSON-LD og footer.
 * Google bruker navn + adresse + telefon som ett fingeravtrykk i lokalt søk.
 * Alle endringer gjøres HER, ikke i de individuelle sidene.
 */
export const VENUE_RISENGA = {
  name: 'Risenga Svømmehall',
  streetAddress: 'Brages vei 8',
  addressLocality: 'Asker',
  postalCode: '1387',
  addressCountry: 'NO',
  displayAddress: 'Brages vei 8, 1387 Asker',
} as const;

/** Høstsemester 2026 – kursinfo brukt i visning og JSON-LD. */
export const COURSE_DAYS = 17;          // ons 19.8–16.12 og tor 20.8–17.12
export const PRICE_PER_SESSION = 185;   // kr
export const TOTAL_PRICE = 3145;        // kr (COURSE_DAYS × PRICE_PER_SESSION)
export const CANONICAL_BASE = 'https://www.læråsvømme.no';

/**
 * Inngangsbillett på Risenga.
 *
 * Etikettene dekker alderen uten hull og uten overlapp: 0–2 / 3–5 / fra 6.
 * Nettopp derfor er «3–5 ar» entydig – naboene fastsetter grensene, og «til
 * og med 5» blir eneste mulige lesning. Der bare ett trinn vises, er det
 * fordi kursets egen aldersgrense holder deltagerne unna overgangen.
 *
 * Fra 6 ar betaler BEGGE hvis den voksne skal vaere med i vannet. Teksten la
 * tidligere i seks kopier med «3-6 ar: barnet betaler, forelder gratis», som
 * ga feil svar for en seksaring.
 */
export interface TicketRule {
  label: string;
  body: string;
}

export const TICKET_RULE_UNDER_3: TicketRule = {
  label: '0–2 år',
  body: 'Den voksne betaler inngang, og barnet går gratis.',
};

export const TICKET_RULE_3_TO_5: TicketRule = {
  label: '3–5 år',
  body: 'Kun barnet betaler inngang. Én voksen ledsager går gratis.',
};

export const TICKET_RULE_FROM_6: TicketRule = {
  label: 'Fra 6 år',
  body: 'Barnet betaler inngang. Skal en voksen være med i vannet, må også den voksne løse billett.',
};

/**
 * Reglene over sier HVEM som betaler, ikke at billetten kommer utenom
 * kursavgiften. En kunde meldte av kurset i oktober 2026 nettopp fordi hun
 * hadde lest hvem-delen og trodd inngangen var dekket. Denne setningen skal
 * derfor staa sammen med prisen overalt den vises.
 */
export const INNGANG_IKKE_INKLUDERT =
  'Inngangsbillett er ikke inkludert i kursavgiften og kommer i tillegg. Den kjøpes på Risenga.';

/**
 * Reglene som gjelder for et kurs – og for et bestemt alderstrinn hvis det er
 * valgt. Aldersgrupper som krysser en grense (2–4 år, fra 5 år) far begge
 * reglene, ellers ville halvparten av foreldrene fatt feil svar.
 */
export const inngangsbillettRegler = (serviceId?: string, ageGroup: string = ''): TicketRule[] => {
  if (serviceId === 'baby') return [TICKET_RULE_UNDER_3];

  if (serviceId === 'toddler') {
    if (/1 - 2/.test(ageGroup)) return [TICKET_RULE_UNDER_3];
    if (/3 - 4|3 - 5/.test(ageGroup)) return [TICKET_RULE_3_TO_5];
    // 2–4 år krysser 3-årsdagen, og kurset som helhet er 1–5 år
    return [TICKET_RULE_UNDER_3, TICKET_RULE_3_TO_5];
  }

  // Barnekursene er «fra 5 år» og krysser dermed 6-årsdagen
  if (serviceId === 'kids_therapy') return [TICKET_RULE_3_TO_5, TICKET_RULE_FROM_6];

  return [];
};

/** Enlinjes variant for de kompakte infoboksene. */
export const inngangsbillettTekst = (serviceId?: string, ageGroup: string = ''): string => {
  const regler = inngangsbillettRegler(serviceId, ageGroup);
  if (regler.length === 0) return 'Inngang kjøpes på Risenga.';
  if (regler.length === 1) {
    return `Inngangsbillett (${regler[0].label.toLowerCase()}): ${regler[0].body}`;
  }
  return `Inngangsbillett: ${regler.map(r => `${r.label} – ${r.body}`).join(' ')}`;
};

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: DayOfWeek.Wednesday,
    startDate: "Oppstart onsdag 19. august 2026",
    durationInfo: "17 kursdager (Oppstart 19. august 2026)",
    sessions: [
      { time: "---", level: "RISENGA VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 1, waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "ons-1500-baby-nybegynner" },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Nybegynner og Øvet", serviceId: "baby", spots: 1, waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "ons-1530-baby-ovet" },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 4, webKey: "ons-1600-smabarn-1-2" },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 4 år", serviceId: "toddler", spots: "Venteliste", webKey: "ons-1630-smabarn-2-3" },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: "Venteliste", webKey: "ons-1700-smabarn-3-4" },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: "Venteliste", webKey: "ons-1730-barn-nybegynner" },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet", serviceId: "kids_therapy", spots: 3, webKey: "ons-1800-barn-ovet" },
    ]
  },
  {
    day: DayOfWeek.Thursday,
    startDate: "Oppstart torsdag 20. august 2026",
    durationInfo: "17 kursdager (Oppstart 20. august 2026)",
    sessions: [
      { time: "---", level: "RISENGA VARMTVANNSSBASSENG", ageGroup: "34 grader" },
      // NB: webKey er koblingsnokkelen mot portalen (activities.metadata->>'web_key')
      // og maa staa uendret selv om klokkeslettet i navnet er utdatert. Endres den
      // uten at portalen endres samtidig, faller live-plasstallene stille tilbake
      // til `spots` under.
      { time: "12:30 - 13:00", level: "Babysvømming", ageGroup: "Nybegynner og Øvet", serviceId: "baby", spots: "Venteliste", waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "tor-1245-baby-ovet" },
      { time: "13:00 - 13:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: "Venteliste", waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "tor-1310-baby-nybegynner" },
      { time: "13:30 - 14:00", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: "Venteliste", waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "tor-1335-baby-nybegynner" },
      { time: "---", level: "RISENGA VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: "Venteliste", waitlistNote: "Se torsdager kl. 15:30 – ledige plasser", webKey: "tor-1500-baby-nybegynner" },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Nybegynner og Øvet", serviceId: "baby", spots: 10, webKey: "tor-1530-baby-ovet" },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 12, webKey: "tor-1600-smabarn-1-2" },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 4 år", serviceId: "toddler", spots: 6, webKey: "tor-1630-smabarn-2-3" },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: "Venteliste", webKey: "tor-1700-smabarn-3-4" },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: "Venteliste", webKey: "tor-1730-barn-nybegynner" },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet", serviceId: "kids_therapy", spots: 4, webKey: "tor-1800-barn-ovet" },
    ]
  },
  /*
   * Utendørstreningene staar UNDER svoemmekursene med vilje. De har ingen
   * fast plan for sesongen — tid og sted avtales fra uke til uke — og derfor
   * heller ingen webKey eller `spots`: her finnes det ikke noe plasstall aa
   * hente fra portalen. Uten `spots` rendrer Schedule ingen plassteller.
   */
  {
    day: DayOfWeek.Monday,
    startDate: "Tid og sted avtales fra uke til uke",
    durationInfo: "Utendørstrening — foreløpig gratis",
    sessions: [
      { time: "---", level: "UTENDØRSTRENING", ageGroup: "Avtales fra uke til uke" },
      { time: "18:15", level: "Sykkeløkt — Semsvannet", ageGroup: "Fra ca. 13 år", serviceId: "outdoor_training" },
    ]
  },
  {
    day: DayOfWeek.Tuesday,
    startDate: "Tid og sted avtales fra uke til uke",
    durationInfo: "Utendørstrening — foreløpig gratis",
    sessions: [
      { time: "---", level: "UTENDØRSTRENING", ageGroup: "Avtales fra uke til uke" },
      { time: "18:15", level: "Løpeøkt", ageGroup: "Føyka bane (fra 9 år og oppover) · Utenfor banen (fra ca. 12 år)", serviceId: "outdoor_training" },
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "baby",
    title: "Babysvømming",
    description: "En trygg start i varmt vann. Nærhet, glede og vanntilvenning for de aller minste.",
    iconName: "Baby",
    imageUrl: "/images/baby_underwater_bw.jpg",
    ageRange: "0 - 1 år",
    details: {
      fullDescription: `**Babysvømming i Asker – en trygg og god start i vann**

Babysvømming gir barnet en trygg og positiv opplevelse i vann – sammen med deg som forelder. Hos Lær å svømme legger vi vekt på ro, nærhet og mestring.

**Hvem passer babysvømming for?**
• Babyer fra 6 uker
• Navlen må være grodd
• Babyen bør veie minst 4 kg
• Forelder er alltid med i vannet

**Hva lærer babyen?**
• Trygghet og ro i vann
• Flyt og bevegelse
• Enkle dykkeøvelser tilpasset barnets utvikling
• Positive sanseopplevelser

Alt skjer på barnets premisser – uten press.

**Praktisk informasjon**
• Sted: Risenga svømmehall, Asker
• Varmt vann (34 grader)
• Tilpassede grupper
• Erfarne instruktører`,
      price: "Kr 3 145,-",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "0 - 1 år (Nivådelt)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Godkjent badebleie (obligatorisk)", "Håndklær", "Såpe til dusj"],
      learningGoals: ["Trygghet og dykking", "Rotasjon og balanse", "Selvberging", "Sosialt samspill"],
      startDate: "Oppstart 19. og 20. august 2026",
      geoIntro: "Babysvømming i Asker for babyer fra 6 uker. Trygg vanntilvenning i varmtvannsbasseng på Risenga. Små grupper og erfarne instruktører.",
      faqs: [
        {
          question: "Hvor gammel må barnet være for å starte?",
          answer: "Barnet kan starte fra 6 ukers alder, forutsatt at navlen er grodd og barnet veier minst 4 kg."
        },
        {
          question: "Må forelder være med i vannet?",
          answer: "Ja, på babysvømming er en forelder alltid med i vannet sammen med barnet. Dette skaper trygghet og nærhet."
        },
        {
          question: "Er babysvømming trygt?",
          answer: "Ja. All undervisning foregår rolig og på barnets premisser, med fokus på trygghet og positive opplevelser."
        },
        {
          question: "Hvilket basseng brukes?",
          answer: "Kursene holdes i varmtvannsbassenget på Risenga svømmehall i Asker, som holder 34 grader – perfekt for babyer."
        },
        {
          question: "Hva trenger vi av utstyr?",
          answer: "Dere trenger godkjent badebleie (eller tett badebukse) til barnet, håndkle og vanlig badetøy til forelder."
        }
      ]
    }
  },
  {
    id: "toddler",
    title: "Småbarnsvømming",
    description: "Småbarnsvømming i Asker – trygg lek og mestring i vann. 1-5 år.",
    iconName: "Waves",
    imageUrl: "/images/baby_swimming_bw.jpg",
    ageRange: "1 - 5 år",
    details: {
      fullDescription: `**Småbarnsvømming i Asker – trygg lek og mestring i vann**

Småbarnsvømming gir barnet en naturlig og trygg videreføring av vanntilvenning. Gjennom lek og enkle øvelser blir barnet tryggere i vann – sammen med deg som forelder.

**Hvem passer småbarnsvømming for?**
• Barn fra 1 til 5 år
• Forelder er alltid med i vannet
• Passer både for barn med og uten tidligere erfaring

**Våre aldersinndelte grupper (1-5 år):**
For at barna skal få best mulig utbytte, deler vi kursene inn i tre aldersgrupper:
*   **Småbarn 1-2 år:** Selvstendighet, fremdrift, flyte, dykke og lek.
*   **Småbarn 2-4 år:** Mer selvstendighet, enkle svømmetak, stuping og sanglek.
*   **Småbarn 3-5 år:** Videreføring av teknikk, rotasjon og fremdrift mot svømmekurs.

**Hva lærer barnet?**
• Trygg bevegelse i vann
• Flyt og balanse
• Enkle hopp og dykkeøvelser
• Å følge instruksjoner gjennom lek

**Hvordan foregår kurset?**
• Små grupper
• Lekbasert undervisning
• Fokus på mestring og glede
• Erfarne instruktører

Alt skjer på barnets nivå – uten press.`,
      price: "Kr 3 145,-",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "1 - 5 år (Grupper: 1-2, 2-4, 3-5)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (anbefales)", "Håndkle"],
      learningGoals: ["Trygghet over/under vann", "Pust, Balanse, Bevegelse", "Flyte på rygg og mage", "Tilnærming til stup/dykk"],
      startDate: "Oppstart 19. og 20. august 2026",
      geoIntro: "Småbarnsvømming for barn 1-5 år på Risenga i Asker. Lek, trygghet og mestring i vann – sammen med forelder. Egne grupper for 1-2, 2-4 og 3-5 år.",
      faqs: [
        {
          question: "Hvor gammel må barnet være?",
          answer: "Dette kurset passer for barn i alderen 1 til 5 år. Vi deler inn i grupper (1-2, 2-4, 3-5) for best tilpasning."
        },
        {
          question: "Må forelder være med i vannet?",
          answer: "Ja, på småbarnsvømming er en forelder alltid med i vannet sammen med barnet. Dette gir trygghet og god oppfølging."
        },
        {
          question: "Hva hvis barnet er utrygt?",
          answer: "Det er helt normalt. Vi tar oss god tid, og presser aldri barnet. Trygghet kommer alltid først."
        },
        {
          question: "Hvilket basseng brukes?",
          answer: "Vi bruker varmtvannsbassenget på Risenga Svømmehall, som holder behagelige 34 grader."
        }
      ]
    }
  },
  {
    id: "kids_therapy",
    title: "Svømmekurs for barn",
    description: "Svømmekurs for barn i Asker (5 år +). Fra trygghet til svømmeferdighet.",
    iconName: "School",
    imageUrl: "/images/kids_underwater_bw.jpg",
    ageRange: "Fra 5 år",
    details: {
      fullDescription: `**Svømmekurs for barn i Asker – fra trygghet til svømmeferdig**

Våre svømmekurs for barn er tilpasset barnets nivå og utvikling. Vi starter alltid med trygghet i vann – og bygger videre mot god svømmeteknikk.

**Hvem passer kursene for?**
• Barn fra 5 år og oppover
• Både nybegynnere og viderekommende
• Barn som vil bli tryggere, lære å svømme eller forbedre teknikk

**Nivåer i varmtvannsbassenget:**
*   **Nybegynner / Litt Øvet:** Målet er å gjøre barnet trygg over og under vann. Vi trener på pusteøvelser, flyte, dykke og enkle spark.
*   **Svømmekurs Øvet:** Vi bygger videre med mer tekniske øvelser innen crawl, bryst og rygg.

**Hva lærer barnet?**
• Flyt og pust
• Rygg- og brystsvømming
• Grunnleggende teknikk
• Utholdenhet og kontroll i vann
• Sikkerhet og selvredning

**Trygg progresjon**
• Små grupper
• Tydelig nivåinndeling
• Fokus på mestring
• Positive opplevelser i vann`,
      price: "Kr 3 145,-",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "Fra 5 år",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (Anbefales!)", "Badehette (Påkrevd for langt hår)"],
      learningGoals: ["Trygghet over/under vann", "Flyte, Dykke, Stupe", "Crawl og Pusteteknikk", "Brystsvømming (intro)"],
      startDate: "Oppstart 19. og 20. august 2026",
      geoIntro: "Svømmekurs for barn fra 5 år og oppover på Risenga i Asker. Fra nybegynner til videregående nivå – trygg progresjon med erfarne instruktører.",
      faqs: [
        {
          question: "Hvilket nivå skal jeg velge?",
          answer: "Velg 'Nybegynner/Litt Øvet' hvis barnet trenger å bli trygg i vann/lære å flyte. Velg 'Øvet' hvis barnet er trygg under vann og klar for teknikk."
        },
        {
          question: "Er foreldre med i vannet?",
          answer: "Ja, på kursene i varmtvannsbassenget (Nybegynner/Øvet) er en forelder med i vannet for å sikre trygghet og god oppfølging."
        },
        {
          question: "Hvor mange barn er det på hvert kurs?",
          answer: "Vi har små grupper for å sikre at alle blir sett. Trygghet og mestring er hovedfokuset."
        },
      ]
    }
  },
  {
    /*
     * Utendørsaktivitet i Idrettsbarnas egen regi. Foregår ute, ikke i
     * spillemiddelfinansiert anlegg, og har ingen klubbtilknytning — hold
     * den slik. Foreløpig gratis, og påmeldingen er en ren interesseliste
     * uten fakturering.
     */
    id: "outdoor_training",
    title: "Utendørstrening for barn og ungdom",
    description: "Sykkel- og løpeøkter ute for barn og ungdom. Tid og sted avtales fra uke til uke. Foreløpig gratis.",
    iconName: "GraduationCap",
    imageUrl: "/images/videregaende_new.jpg",
    ageRange: "Barn og ungdom",
    details: {
      fullDescription: `**Formålet: å bygge opp et barne- og ungdomsparti ute**

Vi vil få på plass et fast barne- og ungdomsparti for utendørstrening. Sykkel- og løpeøktene er starten på det, og hvor mange som melder interesse avgjør hvor raskt vi kommer dit.

Meld deg på om du vil være med fra begynnelsen — da vet vi at grunnlaget er der, og kan sette opp partiet skikkelig.

**Utendørstrening for barn og ungdom**

Øktene er ute — sykkel og løping — for barn og ungdom som har lyst til å prøve seg på mer enn svømming, og de er i regi av Idrettsbarna.

**🚲 Sykkeløkt (mandager) — fra ca. 13 år**
• Oppmøte kl. 18:15 ved Semsvannet
• Vi sykler en del mandager gjennom sesongen, ikke hver uke
• Aldersgrensen henger sammen med at vi sykler i trafikk og over lengre strekk

**👟 Løpeøkt (tirsdager) — fra ca. 12 år, og fra 9 år på Føyka bane**
• Oppmøte kl. 18:15
• Løper vi på banen på Føyka, passer det fint fra 9 år og oppover
• Legger vi økta utenfor banen, bør deltakeren være rundt 12 år eller eldre
• Stedet kan variere fra gang til gang

**Tid og sted avtales fra uke til uke**
Vi setter ikke opp en fast plan for hele sesongen. Før hver økt gir vi beskjed om når og hvor — så slipper dere å binde dere til noe på forhånd.

**Praktisk**
• Foreløpig gratis
• Påmeldingen er en uforpliktende interesseliste — vi tar kontakt før hver økt
• Sykkel og hjelm må medbringes på sykkeløktene
• Kle deg etter været, og ta med drikkeflaske`,
      price: "Gratis",
      duration: "Ca. 1 time",
      location: "Semsvannet (sykkel) og Føyka (løping), Asker",
      age: "Sykkel fra ca. 13 år · Løping fra ca. 12 år (fra 9 år på Føyka bane)",
      parentalInvolvement: "Foreldre er velkomne til å bli med",
      whatToBring: ["Sykkel og hjelm (sykkeløktene)", "Løpesko", "Klær etter været", "Drikkeflaske"],
      learningGoals: ["Sykkelferdigheter", "Løpeteknikk", "Utholdenhet", "Glede ved å være ute"],
      startDate: "Mandager og tirsdager — tid og sted avtales fra uke til uke etter at du har registrert deg",
      geoIntro: "Utendørs sykkel- og løpeøkter for barn og ungdom i Asker. Sykkel fra Semsvannet på mandager (fra ca. 13 år) og løping på Føyka på tirsdager (fra 9 år på banen, ellers fra ca. 12 år). Tid og sted avtales fra uke til uke. Foreløpig gratis.",
      faqs: [
        {
          question: "Hva koster det?",
          answer: "Øktene er foreløpig gratis."
        },
        {
          question: "Hva er målet med treningene?",
          answer: "Vi vil bygge opp et fast barne- og ungdomsparti for utendørstrening. Sykkel- og løpeøktene er starten, og antallet som melder interesse avgjør hvor raskt vi får partiet på plass."
        },
        {
          question: "Er det økt hver uke?",
          answer: "Nei, vi setter ikke opp fast plan for hele sesongen. Sykkeløktene går en del mandager, løpeøktene på tirsdager, og vi gir beskjed om tid og sted fra uke til uke."
        },
        {
          question: "Hvor møtes vi?",
          answer: "Sykkeløktene har oppmøte ved Semsvannet kl. 18:15. Løpeøktene har oppmøte kl. 18:15, vanligvis på Føyka. Nøyaktig sted avtales fra uke til uke."
        },
        {
          question: "Hva må vi ha med?",
          answer: "Sykkel og hjelm på sykkeløktene, løpesko på løpeøktene. Ellers klær etter været og drikkeflaske."
        }
      ]
    }
  },
  {
    id: "lifesaving",
    title: "Livredningsprøve for ansatte",
    description: "Godkjent kurs og prøve for ansatte i skole og barnehage.",
    iconName: "LifeBuoy",
    imageUrl: "/images/girl_goggles_color.jpg",
    ageRange: "Voksne",
    details: {
      fullDescription: `**Livredningsprøven for bhg og skole ansatte**

Idrettsbarna tilbyr nå obligatorisk livredningsprøve for barnehage og skole ansatte.

Vi tilbyr nå livredningsprøven for deres ansatte. Dette er en årlig obligatorisk prøve som ansatte må fullføre for å kunne ha barn med på tur til vannkanten. Kursbevis som blir utdelt ved bestått prøve handler om ferdigheten til å kunne forebygge samt håndtere situasjoner ved drukning i vann om noe skulle oppstå.

Vi har som mål å inspirere deres ansatte med vår kunnskap til å gjøre turen til vann-kanten gøy, trygg og trivelig. Vi har god erfaring med barnehager og skole, samt det å drive svømmekurs. Vi følger Norges Livredningsselskap og er godkjente instruktører.

Kurset og prøven tar ca 1.5 timer.

**TEORI OG PRAKSIS PÅ LAND:**
• Planlegging av turen og å forebygge slik at turen skal være trygg og med minst mulig fare for ulykker.
• Vi gir deltagerne oppgaver i grupper på teori delen.
• Undersøkelse av bevisstløs person demonstrerer vi først. Deretter skal deltagerne få prøvd seg selv.
• Frie luftveier og HLR. Vi demonstrerer først, og deltagerne skal få prøvd seg etterpå.

**PRAKSISDELEN OG LIVREDNINGSPRØVEN:**
• Livredningshopp og forlenget arm.
• Svøm 100 meter på mage og 100 meter på rygg.
• Dykke til bassengets dypeste del og hente opp en synkedukke fra bunn.
• Ilandføre en person 20 meter og direkte gjennomføre HLR på øvelsesdukke.

**UTSTYR PÅ VÅRE KURS:**
• Vi har 4 stk. livredningsdukker.

**EKSTRA: FØRSTEHJELPSKURS OG HJERTESTARTERKURS:**
Førstehjelp med HLR er en fast del av livredningskurset. Vi har i tillegg mulighet til å tilby hjertestarterkurs for deres ansatte – et kurs hvor deltagerne får sertifisering på bruk og forståelsen av hjertestarter. Her kan vi komme til dere og være fleksibel på tid.

Ta kontakt med oss så finner vi en tid som passer for dere og svarer på spørsmål om det er noe dere lurer på. Det er mange som skal ha kurs så det lønner seg å være litt raskt ute.`,
      price: "Kr 850,- per pers",
      duration: "Ca. 1.5 timer",
      location: "Vi avtaler sted som er nærme dere",
      age: "Voksne",
      whatToBring: ["Badetøy", "Klær til svømming (hvis påkrevd)", "Håndkle"],
      learningGoals: ["HLR (Hjerte-Lunge-Redning)", "Førstehjelp ved drukningsulykker", "Ilandføring av person", "Dykking til bunn", "Livredning i vann"],
      startDate: "Vi avtaler tid på når det passer for deres ansatte",
      geoIntro: "Livredningsprøve og førstehjelpskurs for ansatte i skole, SFO og barnehage i Asker, Bærum, Lier, Drammen og Oslo. Vi er fleksible og kommer til det vannet som er nærmest dere, ettersom prøven skjer utendørs – eller i basseng etter avtale.",
      faqs: [
        {
          question: "Hvem er livredningsprøven for?",
          answer: "Kurset er obligatorisk for alle ansatte i skole, SFO og barnehage som skal ha med barn i eller ved vann. Det sikrer at dere er rustet til å håndtere ulykker."
        },
        {
          question: "Hvor holdes kurset?",
          answer: "Vi kommer gjerne til dere! Prøven gjennomføres utendørs i vann eller sjø i nærheten av deres barnehage eller skole, eller i basseng etter avtale."
        },
        {
          question: "Hva inneholder den praktiske prøven?",
          answer: "Prøven består av svømming på mage og rygg, dykking for å hente gjenstand/dukke, og ilandføring av person. I tillegg gjennomgår vi HLR (hjerte-lunge-redning)."
        },
        {
          question: "Hvor lang tid tar det?",
          answer: "Hele opplegget tar ca. 2 timer, inkludert teori og praktisk gjennomføring i vannet."
        },
        {
          question: "Får vi kursbevis?",
          answer: "Ja, alle som består prøven får et godkjent kompetansebevis som er gyldig i ett år. Dette er dokumentasjon på at dere oppfyller kravene fra Utdanningsdirektoratet."
        },
        {
          question: "Tilbyr dere også førstehjelpskurs og hjertestarterkurs?",
          answer: "Ja. Førstehjelp med HLR er en fast del av livredningskurset, og vi tilbyr i tillegg eget hjertestarterkurs der ansatte får sertifisering på bruk og forståelse av hjertestarter. Vi kommer til dere og er fleksible på tid."
        },
        {
          question: "Hva koster livredningsprøven?",
          answer: "Kr 850,- per person. Ta kontakt for tilbud til større grupper i Asker, Bærum, Lier, Drammen og Oslo."
        }
      ]
    }
  },
  {
    id: "preschool",
    title: "Barnehagesvømming",
    description: "Svømmeopplæring for barnehager i Asker (4-6 år). Ta kontakt for tilbud.",
    iconName: "School",
    imageUrl: "/images/barnehagesvomming.jpg",
    ageRange: "4 - 6 år",
    details: {
      fullDescription: `**Utendørs barnehagesvømming – Trygghet og glede i naturen**

Dette kurset foregår ikke i svømmehallen, men utendørs i sjøen eller vannet som ligger nærmest din barnehage.

**Sesong og Varighet**
Vi arrangerer kursene i sommerhalvåret etter avtale med barnehagen.
Hver barnehage får tildelt en hel uke, med svømming 5 dager i strekk fra mandag til fredag. Dette intensive opplegget gir barna god kontinuitet og progresjon.

**Utstyr og Bekledning**
Fryser barna? Nei! Vi stiller opp med våtdrakter til alle barna. Med en våtdrakt og ullundertøy under, er dette en aktivitet barna elsker uansett vær.

**Pedagogisk Opplegg**
Til nå har vi hatt ca. 200 barn som har deltatt på utendørs svømming. Mye handler om å bli trygg på omgivelsene først, for så å bli trygg i vannet. Vi jobber individuelt med hvert enkelt barn ut ifra deres eget utgangspunkt, slik at alle opplever mestring og glede.

**Livredning**
Vi trener også på livredning, noe som er livsviktig kunnskap. Barna elsker å "redde" hverandre i vannet, og vi lærer bort disse ferdighetene gjennom lek og moro.`,
      price: "Kr 1 100,- per barn (pris kan tilpasses ved stort antall)",
      duration: "1 uke (Man-Fre)",
      location: "Utendørs nærmest bhg etter avtale",
      age: "4 - 6 år",
      whatToBring: ["Ullundertøy (til under våtdrakt)", "Håndkle", "Varmt skift"],
      learningGoals: ["Trygghet i utendørs vann", "Livredning og selvberging", "Mestring og glede", "Tilvenning med våtdrakt"],
      startDate: "Etter avtale",
      geoIntro: "Utendørs barnehagesvømming i Asker. Vi kommer til vannet nærmest dere! Med våtdrakter og fokus på livredning gir vi barna en trygg og morsom introduksjon til vann i naturen. Pris kr 1 100 per barn.",
      faqs: [
        {
          question: "Fryser ikke barna når det er utendørs?",
          answer: "Nei, vi stiller med våtdrakter til alle barna. Med ullundertøy under drakten holder de seg varme og gode, og barna elsker det!"
        },
        {
          question: "Hvor foregår svømmingen?",
          answer: "Vi kommer til det vannet eller den stranden som ligger nærmest barnehagen. Dette gjør det enkelt for dere og trygt for barna i kjente omgivelser."
        },
        {
          question: "Når på året arrangeres dette?",
          answer: "Vi arrangerer kursene i sommerhalvåret. Tidspunkt avtales nærmere med hver enkelt barnehage."
        },
        {
          question: "Hvor ofte svømmer barna?",
          answer: "Vi setter av en hel uke per barnehage, hvor barna svømmer hver dag fra mandag til fredag. Dette gir fantastisk progresjon."
        },
        {
          question: "Hva lærer barna?",
          answer: "Fokus er på trygghet i vann, mestring og glede. Vi trener også mye på livredning gjennom lek, hvor barna lærer å redde hverandre."
        }
      ]
    }
  },
];

export const BLOG_POSTS: import('./types').BlogPost[] = [
  {
    slug: "babysvomming-i-asker-med-idrettsbarna---oppst-12",
    title: "Babysvømming i Asker med Idrettsbarna – oppstart 19. og 20. august 2026",
    date: "15. juli 2026",
    excerpt: "Er du klar for en trygg og morsom start i vannet med den lille? Vi starter nye kurs i babysvømming i Asker 19. og 20. august 2026!",
    content: `
Vi gleder oss til å ta imot nye deltakere på Risenga – noen for aller første gang, andre som kanskje kjenner oss fra da storesøsken var liten. Begge deler er like hyggelig.

## Hvorfor babysvømming?

Babysvømming styrker båndet mellom foreldre og barn. I vannet får barnet frihet til å bevege seg på en måte som ikke er mulig på land – det stimulerer motorikk og balanse fra dag én. Det legger også grunnlaget for trygghet i vann, noe som er uvurderlig videre i livet.

## Hva skjer på kurset?

Instruktørene våre veileder dere gjennom en rolig, lærerik og morsom stund i vannet. Vi fokuserer på:

*   Sang, lek og øvelser
*   Trygghet og glede
*   Dykking – når barnet er klart for det
*   Selvberging
*   Sosialt samvær – en fin anledning til å bli kjent med andre i samme livsfase

## Praktisk

*   **Sted:** Risenga Svømmehall, varmtvannsbassenget (34 grader)
*   **Oppstart:** 19. og 20. august 2026
*   **Varighet:** Kurset løper til jul – 17 ganger totalt
*   **Pris:** 3 145 kr for semesteret (185 kr per gang). Inngangsbillett til svømmehallen er ikke inkludert og kommer i tillegg – den kjøpes på Risenga
*   **Kom etter oppstart?** Du betaler bare for gangene som gjenstår
*   **Påmelding:** [Se timeplan og meld deg på her](/#schedule)

Ring Even på **41 90 64 45** om du lurer på noe.

Velkommen i vannet! 💦

*Even og Lotte*
    `,
    imageUrl: "/images/baby_underwater_bw.jpg"
  },
  {
    slug: "hvorfor-er-babysvomming-viktig",
    title: "Hvorfor er babysvømming viktig? 5 gode grunner",
    date: "26. Desember 2025",
    excerpt: "Lurer du på om babysvømming er noe for dere? Her er 5 gode grunner til at tidlig vannlek styrker motorikk, trygghet og båndet mellom foreldre og barn.",
    content: `
**Derfor bør du gå på babysvømming**

Mange småbarnsforeldre lurer på når de bør starte med svømming, og om det egentlig har noen hensikt for de aller minste. Svaret er et rungende ja! Babysvømming er ikke bare en koselig aktivitet, det er også en viktig investering i barnets utvikling og sikkerhet.

### 1. Trygghet i vann redder liv
Den aller viktigste grunnen til å starte tidlig er vanntilvenning. Barn som er vant til vann fra de er små, får en grunnleggende trygghet som gjør det lettere å lære å svømme senere. Vi øver på å dykke, holde pusten og orientere oss under vann – ferdigheter som kan være livreddende.

> **Visste du at?** Babyer har en medfødt lukkerefleks som gjør at de naturlig holder pusten under vann. På kursene våre lærer vi å bruke denne refleksen aktivt før den forsvinner.

### 2. Styrker motorikken
I vannet oppheves tyngdekraften, noe som gir babyen en bevegelsesfrihet de ikke har på land. Dette styrker muskulaturen, bedrer balansen og stimulerer den motoriske utviklingen. Mange opplever at "vannbabyer" blir tidligere mobile også på land.

### 3. Unik kontakt mellom forelder og barn
I en travel hverdag er babysvømming et fristed hvor mobilen ligger i garderoben og fokuset er 100% på barnet. Den fysiske nærheten i det varme vannet, øyekontakten og samspillet skaper sterke bånd og trygge barn.

### 4. Bedre søvn og matlyst
Mange foreldre rapporterer om at barna sover ekstra godt etter en økt i bassenget. Vannaktivitet krever mye energi, og den sanselige opplevelsen av vann mot huden virker beroligende på mange små.

### 5. Sosialt for store og små
Babysvømming er en fin arena for å treffe andre foreldre i samme livsfase. Det er hyggelig å dele erfaringer i garderoben eller ta en kaffe etter kurset. For barna er det også spennende å se og leke med jevnaldrende.

### Når kan man starte?
Hos Idrettsbarna tar vi imot babyer fra de er ca. 3 måneder gamle (og navlen har grodd). Det er aldri for sent å begynne, men det er gull verdt å starte tidlig for å unngå at vannskrekk utvikler seg.

---

### FAQ – Spørsmål om oppstart

**Er klorvannet farlig for huden til babyen?**
Moderne basseng (som våre) har gode renlesystemer og riktig pH-verdi som er skånsom mot huden. Dusj godt etter bading og bruk gjerne litt babyolje.

**Hva om babyen min skriker?**
Det er helt normalt! Vi tar det i barnets tempo. Er det en dårlig dag, tar vi en pause. Ingen blir presset til noe de ikke vil.

---

[Se våre kurs og meld deg på her](/kurs/baby)
    `,
    imageUrl: "/images/baby_swimming_bw.jpg"
  }
];
