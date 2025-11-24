import React from 'react';
import { CreditCard, AlertCircle, FileText, Camera, Users } from 'lucide-react';

const TermsInfo: React.FC = () => {
  return (
    <section id="vilkar" className="py-16 bg-slate-900 border-t border-slate-800 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Priser og Informasjon</h2>
          <p className="mt-4 text-slate-400">
            Viktig informasjon du må lese før påmelding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Pris og Betaling */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-900/30 rounded-lg">
                <CreditCard className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Pris og Betaling 2026</h3>
            </div>
            <ul className="space-y-3 text-slate-300 text-sm leading-relaxed">
              <li>
                <strong className="text-white">Kursavgift:</strong> Kr 4 255,- for 23 kursdager. 
                <span className="block text-slate-500 text-xs mt-1">(Dette tilsvarer kun kr 185,- per gang!)</span>
              </li>
              <li>
                <strong className="text-white">Delt faktura:</strong> Fakturaen kan deles opp som passer for dere. Gi oss beskjed om det er ønskelig.
              </li>
              <li>
                <strong className="text-white">Inngang:</strong> Inngang for voksne og barn er <span className="text-red-300">ikke inkludert</span> i kursavgiften og må kjøpes separat i resepsjonen på Risenga.
              </li>
            </ul>
          </div>

          {/* Undervannsfoto + Layout filler */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-lg h-full flex flex-col justify-center">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-800 rounded-full">
                    <Camera className="text-cyan-400 w-8 h-8" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-lg">Undervannsfotografering</h4>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                        Mot slutten av hver kursrunde tilbyr vi fotografering under vann. 
                        Dette er en gøy opplevelse og et fantastisk minne!
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Vilkår og Betingelser (Pleasant version) */}
        <div className="bg-slate-950 border border-slate-700 p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
              <AlertCircle className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Vilkår og Informasjon</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-slate-300">
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Users size={16} className="text-cyan-500" /> Foreldre i vannet
                    </h4>
                    <p>
                        Foreldre skal delta i vannet sammen med barnet på alle kurs i <strong>varmtvannsbassenget</strong>. På kurs i stort basseng (25m) skal foreldre <em>ikke</em> være med i vannet.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FileText size={16} className="text-slate-500" /> Bindende Påmelding
                    </h4>
                    <p>
                        Påmeldingen er <strong>bindende</strong>. Ved force majeure (stengt basseng utenfor vår kontroll) refunderes ikke kursavgift.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                         <FileText size={16} className="text-slate-500" /> Prisregulering
                    </h4>
                    <p>
                        Ved politisk vedtatte prisreguleringer i Asker kan det forekomme endringer som medfører etterfakturering, selv om vi håper å unngå dette.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                         <FileText size={16} className="text-slate-500" /> Avmelding
                    </h4>
                    <p>
                        Ved avmelding før kursstart: Hvis vi finner en erstatter, påløper kun et gebyr på <strong>kr 500,-</strong>.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default TermsInfo;