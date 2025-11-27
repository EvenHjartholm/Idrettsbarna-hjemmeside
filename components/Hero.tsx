import React from 'react';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Theme } from '../App';

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
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {theme !== 'photo' ? (
        /* Color Mode Content - Now Bottom Aligned & White Text */
        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-24 items-center text-center px-4">

          {/* Badge moved to top */}
          <div className="mb-6 animate-fade-in-up">
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80">
              Ny kursrunde starter januar 2026
            </span>
          </div>

          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-cyan-400">Idrettsbarna</span>
            <span className="block text-xl xs:text-2xl md:text-4xl lg:text-5xl mt-2 font-medium text-white/90">
              Babysvømming og Svømmekurs i Asker
            </span>
          </h1>

          <p className="mt-2 max-w-2xl text-lg xs:text-xl text-white/80 mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Trygghet i vann, mestring og glede gjennom lekbetont læring.
          </p>

          <div className="flex flex-row gap-3 xs:gap-4 justify-center items-center animate-fade-in-up w-full px-2" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-4 xs:px-8 py-3 xs:py-4 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-sm xs:text-lg font-bold rounded-full transition-all border border-cyan-200/30 hover:border-cyan-200/50 backdrop-blur-sm overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Meld på kurs <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-4 xs:px-8 py-3 xs:py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 border border-white/30 hover:border-white/60"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
              <span className="relative font-bold text-white text-sm xs:text-lg tracking-wider flex items-center justify-center gap-2">
                SE KURSTIDER <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Foto Mode Content */
        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 items-center text-center px-4 border-b-[8px] border-white">
          <h2 className="text-3xl md:text-5xl font-sans font-light text-white tracking-[0.2em] uppercase mb-4 drop-shadow-xl animate-fade-in-up">
            Svømmekurs
          </h2>
          <p className="text-base md:text-lg text-white/90 font-light tracking-widest mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            MESTRING I VANN GIR GOD LÆRING
          </p>

          <div className="flex flex-row gap-4 animate-fade-in-up mb-12" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[140px]"
            >
              Kursoversikt
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[140px]"
            >
              Påmelding
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;