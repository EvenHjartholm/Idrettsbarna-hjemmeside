import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Theme } from '../App';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  theme?: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const isTestMode = theme === 'test';
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!isTestMode) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTestMode]);

  if (isTestMode) {
    return (
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Shared Background Image for BOTH modes */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <img
            src={`/images/foto_mode_hero_high_res.jpg?v=${Date.now()}`}
            alt="Hero Background"
            className="w-full h-full object-cover object-[45%_center] md:object-center"
          />
        </div>
        {/* Subtle Gradient at Bottom for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 md:pb-2 items-center text-center px-4">

          {/* SEO: Hidden H1 to preserve keywords */}
          <h1 className="sr-only">
            Idrettsbarna - Babysvømming og Svømmekurs i Asker. Babysvømming i Asker. Babysvømming Asker.
          </h1>

          <div className="mb-3 md:mb-4 animate-fade-in-up">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-sm shadow-lg flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Nyhet
            </span>
          </div>

          {/* Visible Title as H2 (styled as H1) - BOLD for Test Mode */}
          <h2 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide text-white mb-4 md:mb-6 drop-shadow-2xl animate-fade-in-up max-w-5xl leading-relaxed transition-all duration-500" style={{ animationDelay: '0.1s' }}>
            Nye kurs starter <br className="hidden md:block" />
            <span className="text-cyan-300">onsdag 7.</span> og <span className="text-cyan-300">torsdag 8. januar 2026</span>
          </h2>

          <p className="mt-2 max-w-3xl text-base xs:text-lg md:text-xl text-slate-200 mx-auto mb-6 md:mb-8 animate-fade-in-up font-light tracking-wide" style={{ animationDelay: '0.2s' }}>
            <span className="text-cyan-200">Vi har fortsatt ledige plasser, velkommen til oss.</span>
          </p>

          <div className="flex flex-row gap-3 justify-center items-center animate-fade-in-up w-full px-2 mb-1 md:mb-2" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => {
                trackEvent('click_cta', { event_category: 'Hero', event_label: 'Meld deg på nå' });
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-3 bg-cyan-950/40 hover:bg-cyan-950/60 text-cyan-200 text-sm md:text-base font-medium tracking-[0.2em] uppercase rounded-full border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Meld deg på nå <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT HERO (Existing Design)
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
            className="group relative px-8 py-3 bg-cyan-950/40 hover:bg-cyan-950/60 text-cyan-200 text-sm md:text-base font-medium tracking-[0.2em] uppercase rounded-full border border-cyan-500/20 hover:border-cyan-500/40 backdrop-blur-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5"
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