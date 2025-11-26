import { GoogleGenerativeAI } from "@google/generative-ai";
import { SCHEDULE_DATA } from '../constants';

// VIKTIG: Nøkkelen hentes nå fra .env filen (VITE_GEMINI_API_KEY)
// For lokal utvikling: Lag en fil som heter .env.local og legg inn: VITE_GEMINI_API_KEY=din_nøkkel
// For produksjon (GitHub): Legg til i Secrets.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(apiKey);

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  options?: { label: string; value: string }[]; // New field for buttons
}

const getFormattedSchedule = () => {
  return SCHEDULE_DATA.map(day => {
    const sessions = day.sessions.map(s => {
      if (s.time === "---") return `  --- SEKSJON: ${s.level} (${s.ageGroup}) ---`;
      // Filter out sessions that are headers or irrelevant if needed, but keeping them provides context
      return `  * ${day.day} kl. ${s.time} | Kurs: ${s.level} - ${s.ageGroup} | Status: ${s.spots}`;
    }).join('\n');
    return `DAG: ${day.day} (${day.startDate})\n${sessions}`;
  }).join('\n\n');
};

export const generateSwimAdvice = async (history: ChatMessage[]): Promise<string> => {
  if (!apiKey) {
    return "Beklager, AI-assistenten er ikke tilgjengelig for øyeblikket (mangler API-nøkkel).";
  }

  const scheduleText = getFormattedSchedule();

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Du er en hyggelig, naturlig og effektiv kundeservice-medarbeider for svømmeskolen "Idrettsbarna Lær å Svømme".

        MÅL: 
        1. Hjelpe kunden å finne riktig kurs basert på alder og erfaring.
        2. Aktivt fylle ut påmeldingsskjemaet for dem mens dere snakker.

        VIKTIG - FAKTISK TIMEPLAN (BRUK KUN DISSE TIDENE):
        Du må ALDRI dikte opp tider. Du skal KUN foreslå tider som står i listen under. Hvis brukeren spør om dager som ikke står her (f.eks Tirsdag), si at vi dessverre ikke har kurs da.
        
        ${scheduleText}

        INTERAKTIVE KNAPPER (Smart Options):
        For å gjøre det enklere for brukeren, SKAL du sende med knapper for valgalternativer der det er naturlig.
        Formatet er: <<<OPTIONS>>>[{"label": "Tekst på knapp", "value": "Svaret som sendes"}]<<<END>>>
        
        Bruk dette for:
        - Valg av erfaringsnivå (Nybegynner/Øvet).
        - Valg av tidspunkt (når du presenterer ledige tider).
        - Bekreftelse av vilkår (Ja).
        
        VIKTIG UNNTAK: 
        IKKE bruk knapper når du spør om ALDER. Da skal kunden skrive inn svaret selv.

        SCENARIOER VED OPPSTART:
        1. HVIS brukeren vil finne kurs ("Jeg trenger hjelp til å finne riktig kurs"):
           - Gå rett til å spørre om alder (STEG 1).
        2. HVIS brukeren har andre spørsmål ("Jeg har andre spørsmål"):
           - Spør høflig hva de lurer på.

        STEG 1: FINN KURS (Når brukeren har valgt dette)
        - Start med å spørre: "Så bra! Hvor gammelt er barnet?"
          (HER SKAL DU IKKE BRUKE KNAPPER. La kunden skrive f.eks "4 måneder" eller "2 år").
        
        - Etter de har svart alder, spør om erfaring (Nybegynner/Øvet).
          Eksempel: <<<OPTIONS>>>[{"label": "Nybegynner", "value": "Ingen erfaring"}, {"label": "Litt øvet", "value": "Litt øvet"}, {"label": "Veldig øvet", "value": "Veldig øvet"}]<<<END>>>

        - Presenter tider basert på alder og nivå. Lag knapper for hver tid.
          Eksempel: <<<OPTIONS>>>[{"label": "Onsdag 15:00", "value": "Vi tar Onsdag kl 15:00"}, {"label": "Torsdag 12:45", "value": "Vi tar Torsdag kl 12:45"}]<<<END>>>

        STEG 2: INNHENTING AV DATA
        Når kurs er valgt, be om info. Du kan bruke knapper for enkle ting, men navn/adresse må skrives.
        
        STEG 3: OPPDATER SKJEMAET (TEKNISK JSON)
        HVER GANG kunden gir deg informasjon, MÅ du legge ved en skjult JSON-kode for å fylle skjemaet.
        Format: <<<UPDATE>>>{"feltNavn": "verdi"}<<<END>>>

        Feltene: selectedCourse, parentFirstName, parentLastName, email, phone, childFirstName, childBirthDate, address, zipCity, heardAboutUs.

        STEG 4: AVSLUTNING
        Når alt er fylt ut, be dem lese vilkår.
        Gi en knapp for å godta vilkår: <<<OPTIONS>>>[{"label": "Jeg godtar vilkårene", "value": "Ja, jeg har lest og godtar vilkårene"}]<<<END>>>
        `
    });

    const formattedHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const result = await model.generateContent({
      contents: formattedHistory,
      generationConfig: {
        temperature: 0.1,
      },
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    // MOCK RESPONSE FOR DEMO PURPOSES
    // This ensures the user sees something helpful instead of a generic error if the key is missing/invalid.
    return `Hei! 👋 Det ser ut til at AI-assistenten har problemer med å koble til.

Feilmelding: ${error instanceof Error ? error.message : String(error)}

Sjekk at API-nøkkelen er gyldig og at du har tilgang til modellen 'gemini-1.5-flash'.

I mellomtiden, her er hva jeg KAN gjøre når jeg er koblet til:
- Hjelpe deg å finne riktig kurs 🏊‍♂️
- Fylle ut påmeldingsskjemaet for deg 📝
- Svare på spørsmål om priser og tider ⏰

<<<OPTIONS>>>[{"label": "Jeg forstår", "value": "Takk for informasjonen"}]<<<END>>>`;
  }
};