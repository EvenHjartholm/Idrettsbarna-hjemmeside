import { DayOfWeek, ScheduleDay, ServiceItem } from './types';

export const APP_NAME = "Idrettsbarna Lær å Svømme";
export const TAGLINE = "Trygghet og glede i vannet";

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: DayOfWeek.Wednesday,
    startDate: "Oppstart onsdag 7. januar 2026",
    durationInfo: "23 kursdager",
    sessions: [
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 10 },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Øvet / Videregående", serviceId: "baby", spots: 10 },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 9 },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 4 år", serviceId: "toddler", spots: 5 },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: "Venteliste (Ledig plass kl 16:30)" },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: 2 },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet *", serviceId: "kids_therapy", spots: 8 },
      { time: "---", level: "STORBASSENG (25m)", ageGroup: "Kveld" },
      { time: "18:30 - 19:00", level: "Barn Videregående", ageGroup: "Nivå Nybegynner *", serviceId: "kids_pool_25m", spots: 7 },
      { time: "19:00 - 19:30", level: "Barn Videregående", ageGroup: "Nivå Øvet *", serviceId: "kids_pool_25m", spots: 6 },
      { time: "19:30 - 20:00", level: "Barn Videregående", ageGroup: "Nivå Avansert *", serviceId: "kids_pool_25m", spots: 7 },
    ]
  },
  {
    day: DayOfWeek.Thursday,
    startDate: "Oppstart torsdag 8. januar 2026",
    durationInfo: "23 kursdager",
    sessions: [
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Formiddag" },
      { time: "12:45 - 13:10", level: "Babysvømming", ageGroup: "Øvet / Videregående", serviceId: "baby", spots: 2 },
      { time: "13:10 - 13:35", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 5 },
      { time: "13:35 - 14:00", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 12 },
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 11 },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Øvet / Videregående", serviceId: "baby", spots: 8 },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 6 },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 4 år", serviceId: "toddler", spots: 7 },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: "Venteliste (Ledig plass kl 16:30)" },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: 1 },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet *", serviceId: "kids_therapy", spots: 5 },
      { time: "---", level: "STORBASSENG (25m)", ageGroup: "Kveld" },
      { time: "18:30 - 19:15", level: "Barn Videregående", ageGroup: "Avansert *", serviceId: "kids_pool_25m", spots: "Venteliste" },
      { time: "19:15 - 20:00", level: "Barn Videregående", ageGroup: "Avansert *", serviceId: "kids_pool_25m", spots: "Venteliste" },
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
      price: "Kr 4 255,- (23 ganger) - Ta kontakt for delbetaling",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "0 - 1 år (Nivådelt)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Godkjent badebleie (obligatorisk)", "Håndklær", "Såpe til dusj"],
      learningGoals: ["Trygghet og dykking", "Rotasjon og balanse", "Selvberging", "Sosialt samspill"],
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
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
      price: "Kr 4 255,- (23 ganger) - Ta kontakt for delbetaling",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "1 - 5 år (Grupper: 1-2, 2-4, 3-5)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (anbefales)", "Håndkle"],
      learningGoals: ["Trygghet over/under vann", "Pust, Balanse, Bevegelse", "Flyte på rygg og mage", "Tilnærming til stup/dykk"],
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
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
      price: "Kr 4 255,- (23 ganger) - Ta kontakt for delbetaling",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "Fra 5 år",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (Anbefales!)", "Badehette (Påkrevd for langt hår)"],
      learningGoals: ["Trygghet over/under vann", "Flyte, Dykke, Stupe", "Crawl og Pusteteknikk", "Brystsvømming (intro)"],
      membershipRequired: true,
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
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
        {
          question: "Hvorfor må vi være medlem av klubben?",
          answer: "For barn fra 6 år er kursene en del av Asker Triathlonklubbs idrettstilbud, noe som krever medlemskap."
        }
      ]
    }
  },
  {
    id: "kids_pool_25m",
    title: "Barn Videregående (25m)",
    description: "Videregående storbasseng. Teknikk, crawl, rygg, bryst og stup.",
    iconName: "GraduationCap",
    imageUrl: "/images/videregaende_new.png",
    ageRange: "Fra ca 6 år",
    details: {
      fullDescription: `**Videregående svømmekurs for barn (25m)**

Dette kurset er for barn som er svømmedyktige og klare for større utfordringer i 25-meters bassenget.

**Hva lærer barnet?**
• Svømme i 25 meters bassenget
• Gliøvelser på rygg og mage
• Crawl med pust, rygg- og brystsvømming
• Dykking og stuping

**Krav for deltakelse:**
Barnet må være svømmedyktig (trygg på dypt vann, kunne svømme kortere distanser).

**Praktisk informasjon**
• Sted: Risenga Svømmehall (Storbasseng 25m)
• Foreldre venter på land/tribune (ikke med i vannet)
• Fokus er teknikk, utholdenhet og svømmeglede`,
      price: "Kr 4 255,- (23 ganger) - Ta kontakt for delbetaling",
      duration: "30-45 minutter",
      location: "Risenga Svømmehall (Storbasseng 25m), Asker",
      age: "Fra 6 år (Svømmedyktig)",
      parentalInvolvement: "Foreldre er IKKE med i vannet",
      whatToBring: ["Tettsittende badebukse/drakt", "Gode svømmebriller", "Badehette"],
      learningGoals: ["Svømme i 25m basseng", "Crawl m/pust, Rygg, Bryst", "Gliøvelser og Stup", "Dykking"],
      membershipRequired: true,
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
      geoIntro: "Videregående svømmekurs for barn i Asker (25m basseng). Teknikk, utholdenhet og svømmeglede for svømmedyktige barn.",
      faqs: [
        {
          question: "Hva kreves for å delta?",
          answer: "Barnet må være svømmedyktig (trygg på dypt vann). Kurset foregår i det store 25-meters bassenget."
        },
        {
          question: "Er foreldre med i vannet?",
          answer: "Nei, på dette nivået er barna i vannet alene med instruktørene."
        },
        {
          question: "Hvilke svømmearter lærer de?",
          answer: "Hovedfokus er crawl og rygg, med introduksjon til brystsvømming og butterfly etter hvert."
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

**EKSTRA:**
**Hjertestarterkurs:**
Vi har i tillegg til livredningsprøven mulighet til å tilby hjertestarterkurs for deres ansatte. Dette er ett kurs hvor deres ansatte får sertifisering på bruk og forståelsen av hjertestarter. Her kan vi komme til dere og være fleksibel på tid.

Ta kontakt med oss så finner vi en tid som passer for dere og svarer på spørsmål om det er noe dere lurer på. Det er mange som skal ha kurs så det lønner seg å være litt raskt ute.`,
      price: "Kr 850,- per pers",
      duration: "Ca. 1.5 timer",
      location: "Vi avtaler sted som er nærme dere",
      age: "Voksne",
      whatToBring: ["Badetøy", "Klær til svømming (hvis påkrevd)", "Håndkle"],
      learningGoals: ["HLR (Hjerte-Lunge-Redning)", "Ilandføring av person", "Dykking til bunn", "Livredning i vann"],
      startDate: "Vi avtaler tid på når det passer for deres ansatte",
      geoIntro: "Livredningsprøve for ansatte i skole og barnehage i Asker og omegn. Men vi er fleksibel og kommer til det vannet som er nærmest dere etter avtalt sted, ettersom dette skjer utendørs.",
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
        }
      ]
    }
  },
  {
    id: "preschool",
    title: "Barnehagesvømming (Gratis)",
    description: "Gratis svømmeopplæring for barnehager i Asker (4-6 år).",
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
      price: "Gratis (via tilskudd)",
      duration: "1 uke (Man-Fre)",
      location: "Utendørs nærmest bhg etter avtale",
      age: "4 - 6 år",
      whatToBring: ["Ullundertøy (til under våtdrakt)", "Håndkle", "Varmt skift"],
      learningGoals: ["Trygghet i utendørs vann", "Livredning og selvberging", "Mestring og glede", "Tilvenning med våtdrakt"],
      startDate: "Etter avtale",
      geoIntro: "Utendørs barnehagesvømming i Asker. Vi kommer til vannet nærmest dere! Med våtdrakter og fokus på livredning gir vi barna en trygg og morsom introduksjon til vann i naturen.",
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
  }
];

export const BLOG_POSTS: import('./types').BlogPost[] = [
  {
    slug: "babysvomming-i-asker-med-idrettsbarna---oppst-12",
    title: "Babysvømming i Asker med Idrettsbarna - Oppstart 7. og 8. januar 2026",
    date: "26. November 2025",
    excerpt: "Er du klar for en trygg og morsom start i vannet med den lille? Vi starter nye kurs i babysvømming i Asker 7. og 8. januar 2026!",
    content: `
**Velkommen til nye kurs i babysvømming!**

Vi i Idrettsbarna gleder oss stort til å ønske nye og gamle deltakere velkommen til en ny runde med babysvømming i det herlige varmtvannsbassenget på Risenga Svømmehall i Asker.

**Hvorfor babysvømming?**
Babysvømming er en fantastisk aktivitet som styrker båndet mellom foreldre og barn. I vannet får barnet frihet til å bevege seg på en måte som ikke er mulig på land, noe som stimulerer både motorikk og balanse. Det er også en viktig del av vanntilvenningen, som legger grunnlaget for at barnet skal bli trygg i vannet senere i livet.

**Hva skjer på kurset?**
Våre instruktører veileder dere gjennom en hyggelig stund i vannet. Vi fokuserer på:
*   Sang, lek og øvelser
*   Trygghet og glede
*   Dykking (når barnet er klart)
*   Selvberging
*   Sosialt samvær – en fin anledning til å møte andre med babyer og knytte kontakt

**Praktisk informasjon:**
*   **Sted:** Risenga Svømmehall (Varmtvannsbasseng, 34 grader)
*   **Oppstart:** 7. og 8. januar 2026.
*   **Påmelding:** [Se timeplan og meld deg på her](/#schedule).

Vi sikrer at alle får god oppfølging. Vær rask med å sikre deg plass, da disse kursene ofte blir fort fulle!

Velkommen i vannet! 💦
    `,
    imageUrl: "/images/baby_underwater_bw.jpg"
  }
];
