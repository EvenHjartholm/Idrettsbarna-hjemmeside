import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';
import SeaCreature from './SeaCreature';

interface HeroProps {
  theme?: Theme;
  onOpenSchedule?: () => void;
}

const Hero: React.FC<HeroProps> = ({ theme, onOpenSchedule }) => {

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
              if (onOpenSchedule) {
                onOpenSchedule();
              } else {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }
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
                if (onOpenSchedule) {
                  onOpenSchedule();
                } else {
                  document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                }
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

  // NORDIC THEME (Architectural/Clean)
  if (theme === 'nordic') {
    return (
      <section id="hero" className="relative min-h-screen flex items-center bg-[#FAFAF9] overflow-hidden pt-24 pb-16 md:pt-32 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                {/* Content Side - First on Mobile for Impact */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                <div className="space-y-8 animate-fade-in-up order-1 lg:order-1">
                    <div>
                        <span className="text-slate-500 text-sm tracking-[0.25em] uppercase font-semibold border-b border-slate-300 pb-3 block w-fit mb-6">
                           Velkommen til Idrettsbarna
                        </span>
                        <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 leading-[1.05] tracking-tight">
                            Svømmekurs <br/>
                            <span className="italic text-slate-600 font-light text-3xl xs:text-4xl md:text-6xl lg:text-7xl block mt-2">for baby og barn</span>
                        </h1>
                    </div>

                    {/* Mobile Only: Hero Image for Warmth */}
                    <div className="lg:hidden w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-slate-100 mt-6 mb-2">
                         <img 
                            src="/images/baby_underwater_bw.jpg" 
                            alt="Baby svømmer under vann" 
                            className="w-full h-full object-cover grayscale opacity-90 contrast-110 object-[center_30%]"
                         />
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                            <strong className="block text-slate-900 font-medium mb-2">Babysvømming | Småbarn | Barn</strong>
                            Fra 6 uker til videregående. Oppstart 7. og 8. januar i Asker. Tilpassede grupper og 34°C vann.
                        </p>
                        
                        <div className="flex items-center gap-4 text-slate-900 font-medium">
                            <span className="uppercase tracking-widest text-[10px] font-bold border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm shadow-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Påmelding åpen
                            </span>
                            <span className="text-sm border-l border-slate-200 pl-4 text-slate-500">Tlf: 419 06 445</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                        <button
                            onClick={() => {
                                trackEvent('click_cta', { event_category: 'Hero Nordic', event_label: 'Se Kurstider' });
                                if (onOpenSchedule) onOpenSchedule();
                            }}
                            className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            Se Kursoversikt
                        </button>
                        <button
                           onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                           className="w-full sm:w-auto px-10 py-5 border border-slate-300 text-slate-600 text-sm font-bold tracking-widest uppercase hover:text-slate-900 hover:border-slate-900 transition-all bg-transparent"
                        >
                           Les mer
                        </button>
                    </div>
                </div>



                {/* Hero Fish */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <SeaCreature 
                        type="fish" 
                        animation="swim-left" 
                        theme="nordic" 
                        className="bottom-6 right-4 lg:bottom-10 lg:right-0 opacity-60" 
                        delay={1} 
                        size="md"
                    />
                </div>

                {/* Image Side - Architectural/Offset - Hidden on mobile to avoid redundancy */}
                <div className="hidden lg:block relative h-[50vh] lg:h-[80vh] w-full order-2 lg:order-2 mt-8 lg:mt-0">
                     <div className="absolute top-0 right-0 lg:top-10 lg:right-0 w-[90%] lg:w-[85%] h-full lg:h-[85%] bg-slate-200 rounded-[2rem] overflow-hidden shadow-2xl">
                         <img
                           src={`/images/baby_underwater_bw.jpg`}
                           alt="Nordic Style Hero"
                           className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[3s] hover:scale-105"
                         />
                     </div>
                     <div className="absolute -bottom-4 left-4 lg:bottom-10 lg:left-0 w-[40%] max-w-[180px] lg:max-w-none lg:w-[45%] aspect-[4/5] bg-white p-1 shadow-2xl rounded-2xl animate-float border border-slate-50">
                        <div className="w-full h-full rounded-xl overflow-hidden relative">
                             <img
                               src={`/images/kids_underwater_bw.jpg`}
                               alt="Detail"
                               className="w-full h-full object-cover grayscale contrast-125"
                             />
                        </div>
                     </div>
                </div>

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
          loading="eager"
          {...{ fetchpriority: "high" }}
        />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 md:pb-2 items-center text-center px-4">

        {/* SEO: Hidden H1 to preserve keywords */}
        <h1 className="sr-only">
          Idrettsbarna - Babysvømming og Svømmekurs i Asker. Babysvømming i Asker. Babysvømming Asker.
        </h1>

        <div className="mb-3 md:mb-4 animate-fade-in-up">
          <span className="text-[10px] md:text-xs font-serif italic tracking-[0.2em] text-stone-300 uppercase border-b border-stone-500/50 pb-2">
            Svømmekurs for Baby & Barn i Asker
          </span>
        </div>

        <h2 className="text-xl xs:text-2xl md:text-4xl lg:text-5xl font-light font-serif tracking-wide text-white mb-8 md:mb-10 drop-shadow-2xl animate-fade-in-up max-w-5xl leading-relaxed transition-all duration-500" style={{ animationDelay: '0.1s' }}>
          Oppstart <br className="hidden md:block" />
          <span className="italic font-normal border-b border-white/20 pb-1">7. og 8. januar 2026</span>
        </h2>

        <div className="flex flex-row gap-3 justify-center items-center animate-fade-in-up w-full px-2 mb-1 md:mb-2" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => {
              trackEvent('click_cta', { event_category: 'Hero', event_label: 'Meld deg på nå' });
              if (onOpenSchedule) {
                onOpenSchedule();
              } else {
                document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-10 py-5 bg-white text-stone-950 hover:bg-stone-200 transition-all duration-500 uppercase tracking-[0.25em] text-xs md:text-sm font-bold shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
              Reserver Plass
          </button>
        </div>
      </div>
        
    </section>
  );
};

export default Hero;