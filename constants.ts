import { DayOfWeek, ScheduleDay, ServiceItem } from './types';

export const APP_NAME = "Idrettsbarna Lær å Svømme";
export const TAGLINE = "Trygghet og glede i vannet";

export const SCHEDULE_DATA: ScheduleDay[] = [
  {
    day: DayOfWeek.Wednesday,
    startDate: "Oppstart Onsdager 7. Januar 2026",
    durationInfo: "23 kursdager",
    sessions: [
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 12 },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Nybegynner / Øvet / Videregående", serviceId: "baby", spots: 10 },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 10 },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 3 år", serviceId: "toddler", spots: 11 },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: "Venteliste" },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: 8 },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet *", serviceId: "kids_therapy", spots: 10 },
      { time: "---", level: "STORBASSENG (25m)", ageGroup: "Kveld" },
      { time: "18:30 - 19:00", level: "Barn Videregående", ageGroup: "Nivå Nybegynner *", serviceId: "kids_pool_25m", spots: 8 },
      { time: "19:00 - 19:30", level: "Barn Videregående", ageGroup: "Nivå Øvet *", serviceId: "kids_pool_25m", spots: 8 },
      { time: "19:30 - 20:00", level: "Barn Videregående", ageGroup: "Nivå Avansert *", serviceId: "kids_pool_25m", spots: 8 },
    ]
  },
  {
    day: DayOfWeek.Thursday,
    startDate: "Oppstart Torsdager 8. Januar 2026",
    durationInfo: "23 kursdager",
    sessions: [
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Formiddag" },
      { time: "12:45 - 13:10", level: "Babysvømming", ageGroup: "Øvet / Videregående", serviceId: "baby", spots: 5 },
      { time: "13:10 - 13:35", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 6 },
      { time: "13:35 - 14:00", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 12 },
      { time: "---", level: "VARMTVANNSSBASSENG", ageGroup: "Ettermiddag/Kveld" },
      { time: "15:00 - 15:30", level: "Babysvømming", ageGroup: "Nybegynner", serviceId: "baby", spots: 11 },
      { time: "15:30 - 16:00", level: "Babysvømming", ageGroup: "Øvet / Videregående", serviceId: "baby", spots: 10 },
      { time: "16:00 - 16:30", level: "Småbarnsvømming", ageGroup: "1 - 2 år", serviceId: "toddler", spots: 8 },
      { time: "16:30 - 17:00", level: "Småbarnsvømming", ageGroup: "2 - 4 år", serviceId: "toddler", spots: 6 },
      { time: "17:00 - 17:30", level: "Småbarnsvømming", ageGroup: "3 - 4 år", serviceId: "toddler", spots: 3 },
      { time: "17:30 - 18:00", level: "Barn", ageGroup: "Nybegynner / Litt øvet", serviceId: "kids_therapy", spots: 4 },
      { time: "18:00 - 18:30", level: "Barn", ageGroup: "Øvet *", serviceId: "kids_therapy", spots: 7 },
      { time: "---", level: "STORBASSENG (25m)", ageGroup: "Kveld" },
      { time: "18:30 - 19:15", level: "Barn Videregående", ageGroup: "Avansert *", serviceId: "kids_pool_25m", spots: 8 },
      { time: "19:15 - 20:00", level: "Barn Videregående", ageGroup: "Avansert *", serviceId: "kids_pool_25m", spots: 8 },
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
    details: {
      fullDescription: `**En trygg start for de små**

Babysvømming handler om nærhet, trygghet og glede. I vårt varme terapibasseng (34°C) på Risenga Svømmehall skaper vi en rolig atmosfære hvor du og barnet ditt kan utforske vannet sammen.

Gjennom lek, sang og trygge øvelser stimulerer vi barnets motorikk og sanser. Vi fokuserer på:
• **Vanntilvenning:** Trygghet over og under vann.
• **Pustekontroll:** Stimulering av den naturlige dykkerrefleksen.
• **Selvberging:** Lære å holde seg fast og finne veien til kanten.
• **Samspill:** En unik stund med 100% fokus på hverandre.

Våre instruktører er sertifiserte og følger anerkjente pedagogiske prinsipper for å sikre trygghet og progresjon. Vi tilpasser øvelsene til hvert enkelt barns nivå, fra de første badene til selvstendige dykk.

**Populært for hele regionen:**
Mange av våre deltakere kommer fra Bærum, Lier, Røyken og Oslo for å delta på våre kurs i Asker.`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "0 - 12 måneder",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Godkjent badebleie (obligatorisk)", "Håndklær", "Såpe til dusj"],
      learningGoals: ["Trygghet og dykking", "Rotasjon og balanse", "Selvberging", "Sosialt samspill"],
      geoIntro: "Babysvømming i Asker (Risenga Svømmehall) er en trygg og koselig aktivitet for deg og babyen din. I vårt varme terapibasseng (34°C) fokuserer vi på vanntilvenning, motorikk og det unike samspillet mellom foreldre og barn under kyndig veiledning.",
      faqs: [
        {
          question: "Når kan baby starte på babysvømming?",
          answer: "Dere kan starte på babysvømming hos oss fra babyen er ca. 6 uker gammel. Det viktigste er at navlen er helt grodd og at barnet veier over 4 kg."
        },
        {
          question: "Hvor foregår babysvømmingen i Asker?",
          answer: "Kursene holdes i det varme terapibassenget på Risenga Svømmehall i Asker. Vannet holder behagelige 34 grader, perfekt for de minste."
        },
        {
          question: "Hva trenger vi å ha med på første time?",
          answer: "Dere trenger en godkjent badebleie (obligatorisk), håndklær til både liten og stor, og såpe til dusjen. Vi anbefaler også å ta med litt mat til babyen etter badingen."
        },
        {
          question: "Er det instruktør i vannet?",
          answer: "Ja, på våre babysvømmingskurs er instruktøren alltid med i vannet for å vise øvelser og gi trygg veiledning til hver enkelt familie."
        },
        {
          question: "Hvordan fungerer påmelding og betaling?",
          answer: "Du melder deg på via skjemaet her på nettsiden. Faktura sendes på e-post etter påmelding, og plassen er sikret når denne er betalt."
        }
      ]
    }
  },
  {
    id: "toddler",
    title: "Småbarnsvømming",
    description: "Lek og læring hånd i hånd. Vi bygger selvtillit og mestring gjennom morsomme øvelser.",
    iconName: "Waves",
    imageUrl: "/images/baby_swimming_bw.jpg",
    details: {
      fullDescription: `**Lek, mestring og vannglede**

For 1-5 åringer er leken veien til læring. På småbarnsvømming er foreldre med i vannet, og sammen bygger vi videre på barnets ferdigheter.

Målet er å:
• Gjøre barnet trygt over og under vann
• Øve på forskjellige pusteøvelser
• Stimulere til å øve på balanse i vannet
• Øve på at bevegelser i vannet blir viljestyrt av barnet
• Flyte på ryggen og på magen
• Tilnærme å dykke og stupe

Dette kurset gir barnet en solid grunnmur for videre svømmeopplæring, pakket inn i lek og moro.`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "1 - 5 år (Grupper: 1-2 år, 2-4 år, 3-5 år)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (anbefales)", "Håndkle"],
      learningGoals: ["Trygghet over/under vann", "Pust, Balanse, Bevegelse", "Flyte på rygg og mage", "Tilnærming til stup/dykk"],
      geoIntro: "Småbarnsvømming i Asker (Risenga Svømmehall) er for barn i alderen 1-5 år. Gjennom lek og morsomme øvelser bygger vi vanntrygghet og grunnleggende svømmeferdigheter i varmt vann (34°C), med foreldre som aktive deltakere i vannet.",
      faqs: [
        {
          question: "Hva lærer barnet på småbarnsvømming?",
          answer: "Vi fokuserer på selvstendighet i vann, dykking, flyting og enkle svømmetak. Alt læres gjennom lek og sang som skaper mestringsfølelse og vannglede."
        },
        {
          question: "Må foreldre være med i vannet?",
          answer: "Ja, på småbarnsvømming er en forelder med i vannet. Dette gir barnet trygghet og er en fin aktivitet å gjøre sammen."
        },
        {
          question: "Hvordan er nivåene delt inn?",
          answer: "Vi deler inn i aldersgrupper (f.eks. 1-2 år, 2-4 år) og tilpasser øvelsene til barnas ferdighetsnivå, slik at alle får utfordringer som passer dem."
        },
        {
          question: "Hva om barnet mitt er redd for vann?",
          answer: "Våre instruktører er erfarne med å møte barn der de er. Vi tar det i barnets tempo og fokuserer på trygghet før vi går videre til nye øvelser."
        },
        {
          question: "Kan vi starte midt i et kurs?",
          answer: "Ja, hvis det er ledig plass kan dere starte når som helst. Prisen justeres da selvsagt etter hvor mange ganger som gjenstår av kurset."
        }
      ]
    }
  },
  {
    id: "kids_therapy",
    title: "Barn: Nybegynner / Øvet",
    description: "Svømmeopplæring med fokus på teknikk og trygghet. Vi skaper mestringsfølelse.",
    iconName: "School",
    imageUrl: "/images/kids_underwater_bw.jpg",
    details: {
      fullDescription: `**Nivå 1: Barn Nybegynner / Litt Øvet**
Målet er å gjøre barnet trygg over og under vann. Vi fokuserer på:
• Lære pusteøvelser
• Flyte på mage og rygg
• Dykke og stupe
• Øve på benspark til crawl

*Når barnet mestrer disse øvelsene, er neste nivå Barn Øvet.*

**Nivå 2: Barn Øvet**
Her bygger vi videre på ferdighetene. Målet er å:
• Øve på pusteteknikk
• Flyte på mage og rygg, samt rotere i vannet
• Gliøvelser med og uten benspark (rygg og mage)
• Crawl med armer og ben med pusteteknikk
• Dykke og stupe
• Introduksjon til brystsvømming

*Når barnet mestrer disse øvelsene godt, er neste nivå Barn Videregående.*`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "Fra 5 år",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (Anbefales!)", "Badehette (Påkrevd for langt hår)"],
      learningGoals: ["Trygghet over/under vann", "Flyte, Dykke, Stupe", "Crawl og Pusteteknikk", "Brystsvømming (intro)"],
      membershipRequired: true,
      geoIntro: "Svømmekurs for barn i Asker (Risenga Svømmehall) passer for barn fra 5 år. Vi har to nivåer i varmtvannsbassenget: Nybegynner/Litt Øvet for vanntilvenning og grunnleggende teknikk, og Øvet for videreutvikling av svømmeartene.",
      faqs: [
        {
          question: "Hvilket nivå skal jeg velge for mitt barn?",
          answer: "Velg 'Nybegynner/Litt Øvet' hvis barnet trenger å bli trygg i vann, lære å flyte/dykke. Velg 'Øvet' hvis barnet allerede er trygg under vann og klar for mer teknikk (crawl, rygg, bryst)."
        },
        {
          question: "Er foreldre med i vannet på svømmekurs for barn?",
          answer: "Ja, på våre kurs i varmtvannsbassenget (Nybegynner/Øvet) er en forelder med i vannet. Dette sikrer god oppfølging og trygghet for barnet mens de lærer."
        },
        {
          question: "Hvorfor må vi være medlem av Asker Triathlonklubb?",
          answer: "For barn fra 6 år og oppover kreves medlemskap i klubben for å delta på våre kurs, da dette er en del av idrettslagets aktivitetstilbud."
        },
        {
          question: "Hvor mange barn er det på hvert kurs?",
          answer: "Vi har små grupper for å sikre god kvalitet og oppfølging av hvert enkelt barn. Antall plasser varierer, men vi er opptatt av at alle skal bli sett."
        },
        {
          question: "Får barna svømmemerker?",
          answer: "Vi fokuserer primært på ferdighetsutvikling og vannglede, men vi markerer avslutninger og milepæler på en hyggelig måte for barna."
        }
      ]
    }
  },
  {
    id: "kids_pool_25m",
    title: "Barn Videregående (25m)",
    description: "For de som kan svømme. Vi finpusser teknikk og bygger utholdenhet i storbassenget.",
    iconName: "GraduationCap",
    imageUrl: "/images/videregaende_new.png",
    details: {
      fullDescription: `**Barn Videregående (25m basseng)**
Dette kurset er for barn som er svømmedyktige og klare for større utfordringer.

Målet er å:
• Gjøre øvelser i 25 meters bassenget
• Øve på gliøvelser på rygg og mage (med og uten benspark)
• Svømme crawl med pust, samt rygg- og brystsvømming
• Kunne dykke og stupe

*Klarer barnet disse øvelsene i 25 meters bassenget, er neste nivå Barn Avansert.*`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30-45 minutter",
      location: "Risenga Svømmehall (Storbasseng 25m), Asker",
      age: "Fra 6 år (Svømmedyktig)",
      parentalInvolvement: "Foreldre er IKKE med i vannet",
      whatToBring: ["Tettsittende badebukse/drakt", "Gode svømmebriller", "Badehette"],
      learningGoals: ["Svømme i 25m basseng", "Crawl m/pust, Rygg, Bryst", "Gliøvelser og Stup", "Dykking"],
      membershipRequired: true,
      geoIntro: "Videregående svømmekurs i Asker (Risenga 25m basseng) er for barn fra 6 år som er svømmedyktige. Her finpusser vi teknikk i crawl, rygg og bryst, samt trener på stup, vendinger og utholdenhet i det store bassenget.",
      faqs: [
        {
          question: "Hva kreves for å delta på videregående kurs?",
          answer: "Barnet må være svømmedyktig, det vil si trygg på dypt vann og kunne svømme kortere distanser uten hjelpemidler. Kurset foregår i 25-meters bassenget."
        },
        {
          question: "Er foreldre med i vannet her?",
          answer: "Nei, på videregående kurs i 25-meters bassenget er barna i vannet alene med instruktørene. Foreldre kan vente på anvist plass i hallen."
        },
        {
          question: "Hvilke svømmearter lærer de?",
          answer: "Vi fokuserer hovedsakelig på teknikk i crawl (fri) og ryggsvømming, men introduserer også brystsvømming og butterfly etter hvert som ferdighetene øker."
        },
        {
          question: "Hvor lenge varer hver trening?",
          answer: "Treningene varer i 30-45 minutter, avhengig av nivå og gruppeoppsett. Dette gir god tid til både teknikkterping og svømming av lengder."
        },
        {
          question: "Er dette konkurransesvømming?",
          answer: "Dette er et breddeparti med fokus på mestring og treningsglede, men det gir et utmerket grunnlag for de som senere ønsker å begynne med konkurransesvømming."
        }
      ]
    }
  },
  {
    id: "lifesaving",
    title: "Livredningsprøve",
    description: "Godkjent kurs og prøve for ansatte i skole og barnehage.",
    iconName: "LifeBuoy",
    imageUrl: "/images/girl_goggles_color.jpg",
    details: {
      fullDescription: "Livredningsprøven er for ansatte i barnehager og skoler. Vi gjennomfører prøven utendørs, i vann eller sjø i nærheten av din barnehage/skole. Kurset inneholder svømme på mage og på rygg, HLR, og praktisk prøve i vann (ilandføring, dykking). Vi er fleksible og kan ofte tilpasse tidspunkt.",
      price: "Kr 850,- per pers",
      duration: "Ca. 2 timer",
      location: "Utendørs (vann/sjø i nærheten)",
      age: "Voksne",
      whatToBring: ["Badetøy", "Klær til svømming (hvis påkrevd)", "Håndkle"],
      learningGoals: ["HLR (Hjerte-Lunge-Redning)", "Ilandføring av person", "Dykking til bunn", "Livredning i vann"],
      geoIntro: "Livredningsprøve for ansatte i skole og barnehage i Asker og omegn. Vi tilbyr godkjent kurs med HLR og praktisk prøve i vann, gjennomført fleksibelt i nærheten av deres arbeidsplass.",
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
    details: {
      fullDescription: "Gjennom tilskudd fra statsforvalteren kan vi tilby gratis svømmeopplæring for barnehager i Asker. Dette gir barn i alderen 4-6 år muligheten til å utvikle vanntrygghet og svømmeferdigheter. Kontakt oss på even@idrettsbarna.no eller ring 419 06 445 for mer informasjon.",
      price: "Gratis (via tilskudd)",
      duration: "Avtales nærmere",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "4 - 6 år",
      whatToBring: ["Badehette", "Badetøy", "Såpe og håndkle"],
      learningGoals: ["Vanntrygghet", "Selvstendighet i vann", "Grunnleggende ferdigheter", "Glede i vann"],
      geoIntro: "Gratis barnehagesvømming i Asker for barn i alderen 4-6 år. Gjennom statlige midler tilbyr vi vanntilvenning og svømmeopplæring for barnehager i Risenga Svømmehall.",
      faqs: [
        {
          question: "Er tilbudet helt gratis?",
          answer: "Ja, dette er et gratis tilbud finansiert av midler fra Statsforvalteren for å styrke svømmeferdighetene hos barnehagebarn."
        },
        {
          question: "Hvor mange barn kan delta?",
          answer: "Vi tilpasser gruppenes størrelse etter kapasitet og behov. Ta kontakt med oss for å avtale hva som passer for din barnehage."
        },
        {
          question: "Må de ansatte være med i vannet?",
          answer: "Barnehagens ansatte er med som trygghetspersoner på kanten eller i vannet etter behov, mens våre sertifiserte instruktører står for selve undervisningen."
        },
        {
          question: "Når på dagen foregår svømmingen?",
          answer: "Tidspunkt avtales direkte med hver enkelt barnehage. Vi forsøker å finne tider som passer godt inn i barnehagens dagsrytme."
        },
        {
          question: "Hvordan melder vi på barnehagen?",
          answer: "Send en e-post til even@idrettsbarna.no eller ring oss på 419 06 445 for mer informasjon og påmelding."
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
