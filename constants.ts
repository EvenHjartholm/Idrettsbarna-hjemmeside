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
      learningGoals: ["Trygghet og dykking", "Rotasjon og balanse", "Selvberging", "Sosialt samspill"]
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

Vi øver på:
• **Selvstendighet:** Flyte, gli og bevege seg fritt.
• **Dykking:** Hente gjenstander og orientere seg under vann.
• **Sikkerhet:** Hoppe fra kanten og svømme tilbake.

Dette kurset gir barnet en solid grunnmur for videre svømmeopplæring, pakket inn i lek og moro.`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "1 - 5 år (Grupper: 1-2 år, 2-4 år, 3-5 år)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (anbefales)", "Håndkle"],
      learningGoals: ["Trygghet over/under vann", "Pusteøvelser & Balanse", "Flyte på rygg og mage", "Tilnærming til stup/dykk"]
    }
  },
  {
    id: "kids_therapy",
    title: "Barn: Nybegynner / Øvet",
    description: "Svømmeopplæring med fokus på teknikk og trygghet. Vi skaper mestringsfølelse.",
    iconName: "School",
    imageUrl: "/images/kids_underwater_bw.jpg",
    details: {
      fullDescription: `**Fra vanntilvenning til svømmedyktighet**

Våre kurs i varmtvannsbassenget er delt inn i to ulike nivåer for å sikre best mulig oppfølging:

**Barn Nybegynner**
Dette kurset har fokus på å bli trygg over og under vann, samt grunnleggende svømmeteknikk. Vi øver på dykk, stup, og å flyte på mage og rygg.

**Barn Øvet**
Dette kurset har mer fokus på teknikk i brystsvømming, crawl og ryggsvømming. Vi fortsetter med dykk, stup og flyteøvelser for å øke tryggheten ytterligere.

Målet for begge nivåer er svømmedyktighet og en livslang glede ved å være i vann.`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "Fra 5 år",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Badebukse/drakt", "Svømmebriller (Anbefales!)", "Badehette (Påkrevd for langt hår)"],
      learningGoals: ["Nybegynner: Dykke og Flyte", "Litt Øvet: Gli og sparke fra", "Øvet: Sammensatte svømmetak", "Sikkerhet i vann"],
      membershipRequired: true
    }
  },
  {
    id: "kids_pool_25m",
    title: "Barn Videregående (25m)",
    description: "For de som kan svømme. Vi finpusser teknikk og bygger utholdenhet i storbassenget.",
    iconName: "GraduationCap",
    imageUrl: "/images/videregaende_new.png",
    details: {
      fullDescription: `**Teknikk og utholdenhet**

I 25-metersbassenget tar vi svømmingen til neste nivå. Dette er for barn som allerede er trygge på dypt vann.

Vi fokuserer på:
• **Teknikk:** Crawl, rygg og brystsvømming.
• **Ferdigheter:** Stup, vendinger og livredning.
• **Mestring:** Lengre distanser og nye utfordringer.`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30-45 minutter",
      location: "Risenga Svømmehall (Storbasseng 25m), Asker",
      age: "Fra 6 år (Svømmedyktig)",
      parentalInvolvement: "Foreldre er IKKE med i vannet",
      whatToBring: ["Tettsittende badebukse/drakt", "Gode svømmebriller", "Badehette"],
      learningGoals: ["Svømme lengder i 25m basseng", "Crawl og Rygg teknikk", "Stuping og vendinger", "Utholdenhet"],
      membershipRequired: true
    }
  },
  {
    id: "lifesaving",
    title: "Livredningsprøve",
    description: "Godkjent kurs og prøve for ansatte i skole og barnehage.",
    iconName: "LifeBuoy",
    imageUrl: "/images/girl_goggles_color.jpg",
    details: {
      fullDescription: "Livredningsprøven er for ansatte i barnehager og skoler (ikke for barn). Vi gjennomfører prøven utendørs, i vann eller sjø i nærheten av din barnehage/skole. Kurset inneholder alarmrutiner, HLR, og praktisk prøve i vann (ilandføring, dykking). Vi er fleksible og kan ofte tilpasse tidspunkt.",
      price: "Kr 850,- per pers",
      duration: "Ca. 2 timer",
      location: "Utendørs (vann/sjø i nærheten)",
      age: "Voksne",
      whatToBring: ["Badetøy", "Klær til svømming (hvis påkrevd)", "Håndkle"],
      learningGoals: ["HLR (Hjerte-Lunge-Redning)", "Ilandføring av person", "Dykking til bunn", "Livredning i vann"]
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
      learningGoals: ["Vanntrygghet", "Selvstendighet i vann", "Grunnleggende ferdigheter", "Glede i vann"]
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
