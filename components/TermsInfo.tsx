import React from 'react';
import { CreditCard, AlertCircle, FileText, Camera, Users } from 'lucide-react';

const TermsInfo: React.FC = () => {
  return (
    <section id="vilkar" className="py-24 bg-slate-900 border-t border-white/5 scroll-mt-20 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">Priser og Informasjon</h2>
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

        </div>
      </div>
    </section>
  );
};

export default TermsInfo;