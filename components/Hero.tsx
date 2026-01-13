import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';
import SeaCreature from './SeaCreature';

interface HeroProps {
  theme?: Theme;
  onOpenSchedule?: () => void;
}

const Hero: React.FC<HeroProps> = ({ theme, onOpenSchedule }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        '/images/kids_underwater_bw.jpg',
        '/images/baby_swimming_bw.jpg',
        '/images/_MG_1562-Edit.jpg',
        '/images/_MG_1655-Edit.jpg',
        '/images/_MG_8378-Edit-2.jpg',
        '/images/_MG_7207-Edit.jpg',
        '/images/_MG_9818-Edit.jpg' 
    ];

    useEffect(() => {
        if (theme !== 'nordic') return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [theme]);


  if (theme === 'nordic') {
    return (
      <section id="hero" className="relative min-h-screen flex items-center bg-[#FAFAF9] overflow-hidden pt-24 pb-16 md:pt-32 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                {/* Content Side - First on Mobile for Impact */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                <div className="space-y-8 animate-fade-in-up order-1 lg:order-1">
                    {/* Campaign Banner - Nordic */}
                    <div className="mb-6 animate-fade-in-up">
                        <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 sm:pr-6 backdrop-blur-sm">
                            <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full w-fit">
                                Kampanje
                            </span>
                            <p className="text-emerald-900 text-sm font-medium leading-tight max-w-md">
                                <span className="font-bold">40% rabatt</span> på babysvømming onsdager og torsdager kl. 15:00.
                                <span className="block sm:inline sm:ml-1 text-emerald-700 font-normal text-xs opacity-80 mt-0.5 sm:mt-0">
                                    (Kun 10 plasser. Merk med '40% rabatt')
                                </span>
                            </p>
                        </div>
                    </div>

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
                        <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-100">
                             {heroSlides.map((slide, index) => (
                                 <img
                                    key={slide}
                                    src={slide}
                                    alt={`Slide ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover grayscale contrast-110 transition-opacity duration-1000 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                 />
                             ))}
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

        {/* Campaign Banner - Default Theme */}
        <div className="mb-4 animate-fade-in-up">
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-stone-900/60 border border-white/10 rounded-2xl p-3 sm:pr-6 backdrop-blur-md shadow-2xl">
                <span className="bg-cyan-500 text-slate-900 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full w-fit shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Kampanje
                </span>
                <p className="text-white text-sm font-medium leading-tight text-left sm:text-center">
                   <span className="font-bold text-cyan-300">40% rabatt</span> på babysvømming ons/tor kl. 15.
                   <span className="block sm:inline sm:ml-2 text-slate-300 font-normal text-xs mt-1 sm:mt-0">
                       (Merk med '40% rabatt')
                   </span>
                </p>
            </div>
        </div>

        <div className="mb-3 md:mb-4 animate-fade-in-up">
          <h1 className="text-[10px] md:text-xs font-serif italic tracking-[0.2em] text-stone-300 uppercase border-b border-stone-500/50 pb-2">
            Svømmekurs for Baby & Barn i Asker
          </h1>
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