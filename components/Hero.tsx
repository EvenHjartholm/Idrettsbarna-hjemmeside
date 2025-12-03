import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  theme?: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {

  // LUXURY THEME (Gold)
  if (theme === 'luxury') {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Luxury Background */}
        <div className="absolute inset-0 opacity-60">
          <img
            src={`/images/foto_mode_hero_high_res.jpg?v=${Date.now()}`}
            alt="Hero Background"
            className="w-full h-full object-cover object-center grayscale-[20%] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
          <div className="mb-6">
            <span className="text-accent text-xs md:text-sm font-serif italic tracking-[0.2em] uppercase border-b border-accent/50 pb-2">
              Eksklusivt i Asker
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">
            Svømmeglede <br />
            <span className="text-accent italic">for livet</span>
          </h1>

          <p className="text-stone-300 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl leading-relaxed">
            Opplev vanntilvenning og svømmeopplæring i en klasse for seg.
            Små grupper, personlig oppfølging og trygge rammer.
          </p>

          <button
            onClick={() => {
              trackEvent('click_cta', { event_category: 'Hero Luxury', event_label: 'Reserver plass' });
              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-10 py-4 bg-transparent border border-accent/30 text-accent hover:bg-accent hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-sm font-medium"
          >
            Reserver Plass
          </button>
        </div>
      </section>
    );
  }

  // BW THEME (Structure/Photo)
  if (theme === 'bw') {
    return (
      <section id="hero" className="relative h-screen flex items-center overflow-hidden bg-white text-black">
        {/* Split Layout Background */}
        <div className="absolute inset-0 md:w-1/2 md:left-1/2 h-full">
          <img
            src={`/images/foto_mode_hero_high_res.jpg?v=${Date.now()}`}
            alt="Hero Background"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
        </div>

        <div className="relative z-10 w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-20 bg-white/90 md:bg-white">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-black leading-[0.9]">
              LÆR<br />
              Å<br />
              SVØMME.
            </h1>

            <div className="w-20 h-2 bg-black mb-8" />

            <p className="text-zinc-600 text-lg md:text-xl font-medium mb-10 max-w-md">
              Profesjonell svømmeopplæring for baby og barn i Asker.
              Strukturert. Trygt. Gøy.
            </p>

            <button
              onClick={() => {
                trackEvent('click_cta', { event_category: 'Hero BW', event_label: 'Start Nå' });
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-black text-white px-8 py-4 text-lg font-bold tracking-tight hover:bg-zinc-800 transition-colors flex items-center gap-4 group"
            >
              SE KURSTIDER <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT HERO (Existing Design - Ocean/Refined)
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
          <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-cyan-200 uppercase bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Nyhet
          </span>
        </div>

        <h2 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide text-white mb-4 md:mb-6 drop-shadow-2xl animate-fade-in-up max-w-5xl leading-relaxed transition-all duration-500" style={{ animationDelay: '0.1s' }}>
          Nye kurs starter <br className="hidden md:block" />
          <span className="text-cyan-300">onsdag 7.</span> og <span className="text-cyan-300">torsdag 8. januar 2026</span>
        </h2>



        <div className="flex flex-row gap-3 justify-center items-center animate-fade-in-up w-full px-2 mb-1 md:mb-2" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => {
              trackEvent('click_cta', { event_category: 'Hero', event_label: 'Meld deg på nå' });
              document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 transition-all"
          >
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--accent)_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
            <div className="relative h-full w-full bg-primary/80 hover:bg-primary/60 rounded-full px-8 py-3 flex items-center justify-center gap-2 backdrop-blur-sm transition-colors">
              <span className="text-accent text-sm md:text-base font-medium tracking-[0.2em] uppercase flex items-center gap-2">
                Meld deg på nå <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;