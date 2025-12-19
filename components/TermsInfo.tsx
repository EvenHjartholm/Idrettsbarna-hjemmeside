import React from 'react';
import { CreditCard, AlertCircle, FileText, Camera, Users } from 'lucide-react';

import { Theme } from '../types';

interface TermsInfoProps {
  theme?: Theme;
}

const TermsInfo: React.FC<TermsInfoProps> = ({ theme }) => {
  
  // NORDIC THEME
  if (theme === 'nordic') {
    return (
       <section id="vilkar" className="py-24 bg-[#FAFAF9]">
           <div className="max-w-7xl mx-auto px-6 lg:px-8">
               <div className="text-center mb-16 space-y-4">
                 <span className="text-slate-500 text-xs tracking-[0.2em] uppercase font-semibold">
                    Praktisk informasjon
                 </span>
                 <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                    Priser og Vilkår
                 </h2>
                  <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light leading-relaxed">
                     Alt du trenger å vite før kursstart.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { icon: CreditCard, title: "Pris og Betaling", text: "Kursavgiften er kr 4 255,- for 23 kursdager. Faktura kan deles opp ved behov.", sub: "* Inngang til svømmehallen kommer i tillegg." },
                   { icon: Camera, title: "Undervannsfoto", text: "Vi tilbyr fotografering under vann mot slutten av kurset. Et fantastisk minne for livet!", sub: null },
                   { icon: Users, title: "Foreldre i vannet", text: "På kurs i varmtvannsbassenget deltar en forelder i vannet. I 25m-bassenget er barna alene uti.", sub: null },
                   { icon: FileText, title: "Bindende påmelding", text: "Påmeldingen er bindende. Ved sykdom eller force majeure gjelder egne regler.", sub: null },
                   { icon: AlertCircle, title: "Avmelding", text: "Ved avmelding før kursstart (hvis vi finner erstatter) påløper et gebyr på kr 500,-.", sub: null },
                   { icon: FileText, title: "Prisregulering", text: "Endringer i kommunale satser kan medføre justering av prisen.", sub: null },
                   { icon: FileText, title: "Vilkår", text: "Les våre fullstendige vilkår kan leses ved påmelding.", link: true, sub: null }
                 ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                            <item.icon className="w-6 h-6 text-slate-700" />
                        </div>
                        <h3 className="text-xl font-serif text-slate-900 mb-3">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 font-light text-sm leading-relaxed mb-2">
                             {item.link ? (
                                <>Les våre fullstendige vilkår her: <a href="/vilkar" className="text-slate-900 font-medium underline">Vilkår for påmelding</a></>
                             ) : item.text}
                        </p>
                        {item.sub && (
                            <p className="text-xs text-slate-400 mt-2 font-medium italic">
                                {item.sub}
                            </p>
                        )}
                    </div>
                 ))}
               </div>
           </div>
       </section>
    );
  }

  // DEFAULT THEME
  return (
    <section id="vilkar" className="py-24 bg-slate-900 border-t border-white/5 scroll-mt-20 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">Priser, Informasjon og Vilkår</h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Nyttig informasjon for deg som skal delta på kurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Pris Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Pris og Betaling</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Kursavgiften er kr 4 255,- for 23 kursdager. Faktura kan deles opp ved behov.
            </p>
            <p className="text-xs text-slate-500">
              * Inngang til svømmehallen kommer i tillegg.
            </p>
          </div>

          {/* Foto Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
              <Camera className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Undervannsfoto</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Vi tilbyr fotografering under vann mot slutten av kurset. Et fantastisk minne for livet!
            </p>
          </div>

          {/* Foreldre Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Foreldre i vannet</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              På kurs i varmtvannsbassenget deltar en forelder i vannet. I 25m-bassenget er barna alene uti.
            </p>
          </div>

          {/* Påmelding Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Bindende påmelding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Påmeldingen er bindende. Ved sykdom eller force majeure gjelder egne regler.
            </p>
          </div>

          {/* Avmelding Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Avmelding</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ved avmelding før kursstart (hvis vi finner erstatter) påløper et gebyr på kr 500,-.
            </p>
          </div>

          {/* Prisregulering Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-slate-700/30 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Prisregulering</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Endringer i kommunale satser kan medføre justering av prisen.
            </p>
          </div>

          {/* Vilkår Card */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Vilkår</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Les våre fullstendige vilkår her: <a href="/vilkar" className="text-cyan-400 hover:text-cyan-300 underline">Vilkår for påmelding</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsInfo;