import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NewsBannerProps {
    theme?: 'color' | 'photo' | 'test';
}

const NewsBanner: React.FC<NewsBannerProps> = ({ theme }) => {
    return (
        <div
            className="bg-slate-900 border-b border-white/5 py-8 px-4 cursor-pointer group relative overflow-hidden transition-colors hover:bg-slate-900/80"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
            <div className="max-w-4xl mx-auto text-center space-y-3">
                <div className="flex justify-center">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900/50">
                        Nyhet
                    </span>
                </div>

                <h3 className="text-xl md:text-2xl font-light text-white leading-relaxed">
                    Nye kurs starter <span className="font-semibold text-cyan-100">onsdag 7.</span> og <span className="font-semibold text-cyan-100">torsdag 8. januar 2026</span>
                </h3>

                <p className="text-slate-400 text-sm md:text-base font-light">
                    {theme === 'test' ? (
                        "Velkommen til oss, Risenga svømmehall"
                    ) : (
                        <>Risenga svømmehall i Asker. <span className="text-slate-500">Velkommen til oss.</span></>
                    )}
                </p>

                <div className="pt-2 flex justify-center">
                    <span className="text-cyan-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:text-cyan-300 transition-colors border-b border-transparent group-hover:border-cyan-300 pb-0.5">
                        Meld deg på nå <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewsBanner;
