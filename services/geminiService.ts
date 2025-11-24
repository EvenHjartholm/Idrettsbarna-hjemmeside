import { GoogleGenAI } from "@google/genai";
import { SCHEDULE_DATA } from '../constants';

// NOTE: In a real production app, ensure this key is protected via a backend proxy.
// WARNING: The API key is currently exposed to the client. This is not secure for production.
// Anyone inspecting the network traffic can see your API key.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

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
    const formattedHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
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
        `,
        temperature: 0.1,
      },
    });

    return response.text || "Beklager, jeg kunne ikke generere et svar akkurat nå.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Beklager, det oppstod en feil med assistenten. Vennligst prøv igjen senere.";
  }
};