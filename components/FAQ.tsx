import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Hvorfor er babysvømming bra for barnet?",
    answer: "Babysvømming gir en unik læringsarena. Forskning viser at tidlig vannlek styrker barnets motoriske, fysiske og sosiale utvikling. Vannets oppdrift gir bevegelsesfrihet som styrker muskler, balanse og kjernemuskulatur, noe som kan hjelpe barnet med milepæler som å rulle, sitte og krabbe."
  },
  {
    question: "Hva lærer barnet på svømming?",
    answer: "Utover gleden ved å være i vann, lærer barnet livsviktig vanntilvenning og respekt for vannet. Øvelsene stimulerer sansene, kroppsbevissthet og koordinasjon. Barnet får mestringsfølelse, og mange foreldre opplever at aktiviteten gir ro og bedre søvn."
  },
  {
    question: "Styrker det båndet mellom foreldre og barn?",
    answer: "Absolutt! Babysvømming er en aktivitet med 100% fokus på hverandre uten digitale distraksjoner. Dette bygger nærhet, tillit og trygghet mellom dere. Foreldre får også veiledning i hvordan de best støtter barnet i vannet."
  },
  {
    question: "Når kan babyen begynne på babysvømming?",
    answer: "Babyer kan starte på babysvømming fra de er ca. 6 uker gamle. Det er viktig at navlen er helt grodd og at babyen veier minst 4 kg. Allerede i magen er babyen vant til vann, og de har medfødte reflekser som vi bygger videre på i trygge omgivelser."
  },
  {
    question: "Hvor varmt er vannet i bassenget?",
    answer: "Kursene for babysvømming, småbarn og barn nybegynner/øvet holdes i Terapibassenget i Asker. Vannet holder behagelige 34 grader, noe som er perfekt for de minste."
  },
  {
    question: "Hva skjer hvis vi er syke og mister en time?",
    answer: "Av sikkerhetsmessige og hygieniske årsaker kan man ikke bade hvis barnet har smittsomme sykdommer (f.eks. øyekatarr, oppkast/diaré). Ved langvarig sykdom (mer enn 2-3 ganger) med legeerklæring, prøver vi å finne en løsning."
  },
  {
    question: "Må foreldre være med i vannet?",
    answer: "På Babysvømming og Småbarnsvømming (1-5 år), samt alle kurs i varmtvannsbassenget, skal en forelder være med i vannet. På svømmekurs i stort basseng (25m) skal foreldre ikke være med uti."
  },
  {
    question: "Trenger barnet badebleie?",
    answer: "Ja, alle barn som bruker bleie på land MÅ bruke godkjent badebleie i bassenget. Dette er obligatorisk for å sikre hygienen i bassenget."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-900/20 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Spørsmål og Svar</h2>
          <p className="mt-4 text-slate-400">
            Lurer du på noe? Her finner du nyttig informasjon om våre kurs.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-slate-900 rounded-xl border transition-all duration-300 ${
                openIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-cyan-400' : 'text-slate-200'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;