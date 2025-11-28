import React from 'react';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Theme } from '../App';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  theme?: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Shared Background Image for BOTH modes */}
      <div className="absolute inset-0">
        <img
          src={`/images/foto_mode_hero_high_res.jpg?v=${Date.now()}`}
          alt="Hero Background"
          className="w-full h-full object-cover object-[45%_center] md:object-center"
        />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 md:pb-2 items-center text-center px-4">

        {/* SEO: Hidden H1 to preserve keywords */}
        <h1 className="sr-only">
          Idrettsbarna - Babysvømming og Svømmekurs i Asker. Babysvømming i Asker. Babysvømming Asker.
        </h1>

        <div className="mb-3 md:mb-4 animate-fade-in-up">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-sm shadow-lg">
            Nyhet
          </span>
        </div>

        {/* Visible Title as H2 (styled as H1) - Slightly reduced size to fit below subjects */}
        <h2 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-2 md:mb-3 drop-shadow-2xl animate-fade-in-up max-w-5xl leading-tight" style={{ animationDelay: '0.1s' }}>
          Nye kurs starter <span className="font-bold text-cyan-400">onsdag 7.</span> og <span className="font-bold text-cyan-400">torsdag 8. januar 2026</span>
        </h2>

        <p className="mt-1 max-w-2xl text-sm xs:text-base md:text-lg text-slate-300 mx-auto mb-3 md:mb-4 animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
          Risenga svømmehall i Asker. <span className="text-cyan-200 font-medium">Er kurset fullt? Vi har ventelister.</span>
        </p>

        <div className="flex flex-row gap-3 justify-center items-center animate-fade-in-up w-full px-2 mb-1 md:mb-2" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => {
              trackEvent('click_cta', { event_category: 'Hero', event_label: 'Meld deg på nå' });
              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-6 py-2.5 md:px-8 md:py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm md:text-base font-bold rounded-full transition-all shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Meld deg på nå <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;