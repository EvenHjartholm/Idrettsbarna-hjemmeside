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
      fullDescription: `**Trygghet, glede og mestring i vann**

Nærheten til vann har alltid fascinert både små og store. For mange foreldre dukker spørsmålet opp tidlig: Hvordan sørger vi for at barna våre føler seg trygge i og rundt vann? Babysvømming har etablert seg som et verdifullt tilbud for å skape en god relasjon til vann allerede fra spedbarnsalder.

**Hvorfor babysvømming?**
Foreldres mulighet til å delta sammen med sitt barn, å oppleve nærhet, trygghet og glede i vannet, er ofte minst like verdifull som svømmeferdighetene selv. Det sosiale spiller inn, og for mange kan babysvømming fort bli ukas høydepunkt. Samspill mellom små barn, foreldre og instruktørene skaper en varm og ivaretakende atmosfære.

**Slik foregår kurset**
Babysvømming i Asker arrangeres i varmtvannsbasseng (32–34 grader), noe som sikrer at de små (fra 6 uker) føler seg komfortable. Timene organiseres med korte økter hvor lek, sang og enkle øvelser blandes. Babyene blir kjent med vann, lærer å holde pusten og blir trygge med å bevege seg. Foreldrenes rolle er sentral; de holder, støtter og gir positive signaler hele veien.

**Hva lærer vi?**
Vi introduserer gradvis:
• Vanntilvenning: Bli kjent med temperatur, vektløshet og bevegelse.
• Pusterefleks: Stimulering av den naturlige dykkerrefleksen.
• Motorisk utvikling: Koordinasjon, balanse og muskelbruk.
• Sosialisering: Møte jevnaldrende og utveksle erfaringer.
• Vannvett: Holde seg fast, ligge på ryggen og finne kanten.

---

**Våre Nivåer**

**Nivå 1: Baby Nybegynner**
*Målet er:*
• Gjøre foreldrene trygge på å ha med barnet i vann.
• Gi babyen tid til å oppleve glede i rolige omgivelser.
• Vi starter med dykk.
• Gjentagende start/slutt for trygghet og gjenkjennelse.

**Nivå 2: Baby Øvet**
*Målet er:*
• Trygghet og glede.
• Videreutvikle dykk til å bli mer selvstendige.
• Vi stuper fra kanten.
• Selvbergende faktor kommer tydeligere frem.
• Babyen skaper fremdrift i vannet.

**Nivå 3: Baby Videregående**
*Målet er:*
• Trygghet og glede.
• Selvstendige dykk under stadig utvikling.
• Mer selvstendige stup.
• Øvelser som ivaretar selvbergende faktor.
• Flere sangleker for glede og samhold.

---

**Fordeler med babysvømming**
• Fysisk styrke: Bevegelse i vann styrker muskulaturen.
• Sosiale ferdigheter: Samspill med andre barn og voksne.
• Bedre søvn: Mange opplever at babyen sover bedre etterpå.
• Mestringsfølelse: Stor glede for både barn og foreldre.

**Det sosiale aspektet**
Barnelatter og plasking skaper bånd. Mange foreldre finner nye venner i gruppen, og det er et viktig nettverk for mange i permisjon. Det er et sted hvor spørsmål om alt fra første tann til yndlingsbleie har like stor plass som svømmeferdigheter.

**Kontakt oss**
Har du spørsmål? Send gjerne en mail til even@idrettsbarna.no`,
      price: "Kr 4 255,- (23 ganger)",
      duration: "30 minutter",
      location: "Risenga Svømmehall (Varmtvannsbasseng), Asker",
      age: "0 - 1 år (Nivådelt)",
      parentalInvolvement: "Foreldre er med i vannet",
      whatToBring: ["Godkjent badebleie (obligatorisk)", "Håndklær", "Såpe til dusj"],
      learningGoals: ["Trygghet og dykking", "Rotasjon og balanse", "Selvberging", "Sosialt samspill"],
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
      geoIntro: "Babysvømming er en trygg og koselig aktivitet for deg og babyen din. I vårt varme terapibasseng (34°C) fokuserer vi på vanntilvenning, motorikk og det unike samspillet mellom foreldre og barn under kyndig veiledning.",
      faqs: [
        {
          question: "Kan babyen min bli forkjølet av å bade?",
          answer: "Varmtvannsbasseng og jevnlig sjekk av hygiene holder risikoen lav. Tørk barnet godt etter bad og sørg for at det ikke er for kaldt før og etter aktivitet."
        },
        {
          question: "Er det trygt for barn med eksem?",
          answer: "De fleste barn med mildt eksem tåler babysvømming, men rådfør deg gjerne med lege. Vi anbefaler å skylle godt, smøre huden etterpå, og eventuelt bruke kuldekrem før bading som barriere mot klor."
        },
        {
          question: "Kan begge foreldre delta samtidig?",
          answer: "Ja, det er bare koselig at begge kan være med og delta i vannet sammen med barnet."
        },
        {
          question: "Når er det for sent å begynne?",
          answer: "Aldri! Det finnes egne partier for større barn og tilpasset vanntrening for alle nivåer. Vi tilpasser opplæringen til barnets alder og forutsetninger."
        },
        {
          question: "Når kan vi starte?",
          answer: "Dere kan starte fra babyen er ca. 6 uker gammel. Det viktigste er at navlen er helt grodd og at barnet veier over 4 kg."
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
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
      geoIntro: "Småbarnsvømming for barn 2-4 år. Gjennom lek og trygge rammer lærer barna vanntilvenning, dykking og selvberging i vårt varme terapibasseng.",
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
Målet er å gjøre barnet trygg over og under vann. Her trener vi på crawl, litt brystsvømming og ryggsvømming. Vi fokuserer på:
• Lære pusteøvelser
• Flyte på mage og rygg
• Dykke og stupe
• Øve på benspark til crawl

*Når barnet mestrer disse øvelsene, er neste nivå Barn Øvet.*

**Nivå 2: Barn Øvet**
Her bygger vi videre på ferdighetene med mer tekniske øvelser innen crawl, bryst og rygg. Målet er å:
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
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
      geoIntro: "Våre svømmekurs passer for barn fra 5 år. Vi har to nivåer i varmtvannsbassenget: Nybegynner/Litt Øvet for vanntilvenning og grunnleggende teknikk, og Øvet for videreutvikling av svømmeartene.",
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
      startDate: "Onsdag 7. og torsdag 8. januar 2026",
      geoIntro: "Videregående svømmekurs for barn. For barn som er trygge på dypt vann og klare for å lære teknikk i crawl, rygg og brystsvømming.",
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
    title: "Livredningsprøve for ansatte",
    description: "Godkjent kurs og prøve for ansatte i skole og barnehage.",
    iconName: "LifeBuoy",
    imageUrl: "/images/girl_goggles_color.jpg",
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
