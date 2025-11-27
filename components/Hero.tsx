import React from 'react';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Theme } from '../App';

interface HeroProps {
  theme?: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  return (
    <section id="hero" className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${theme === 'photo' ? 'bg-transparent' : 'bg-primary'}`}>
      {/* Abstract Background Elements - Organic Pulsing */}
      {theme !== 'photo' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {/* Deep Background Base */}
          <div className="absolute inset-0 bg-primary"></div>

          {/* Irregular Pulsing Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-accent/5 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-600/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '5s', animationDuration: '12s' }}></div>

          {/* Vignette for focus */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-primary/30 to-primary"></div>
        </div>
      )}

      {theme !== 'photo' ? (
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-txt-primary mb-6 drop-shadow-2xl animate-fade-in-up">
            <span className="block text-accent">Idrettsbarna</span>
            <span className="block text-xl xs:text-2xl md:text-4xl lg:text-5xl mt-2 font-medium text-txt-secondary">
              Babysvømming og Svømmekurs i Asker
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg xs:text-xl text-txt-muted mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Trygghet i vann, mestring og glede gjennom lekbetont læring.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up w-full px-4" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 text-lg font-bold rounded-full transition-all border border-cyan-200/30 hover:border-cyan-200/50 backdrop-blur-sm overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Meld på kurs <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 border border-white/30 hover:border-white/60"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors"></div>
              <span className="relative font-bold text-white tracking-wider flex items-center justify-center gap-2">
                SE KURSTIDER <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Hasselblad-style Layout for Foto Mode */
        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 items-center text-center px-4 border-b-[8px] border-white">

          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <img
              src={`/images/foto_mode_hero_high_res.jpg?v=${Date.now()}`}
              alt="Hero Background"
              className="w-full h-full object-cover object-[45%_center] md:object-center"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>



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

      <div className="absolute bottom-8 sm:bottom-24 left-1/2 transform -translate-x-1/2 w-full px-4">
        <div className="flex flex-col items-center gap-4 text-txt-muted/80">
          {theme !== 'photo' && (
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-center">
              Ny kursrunde starter januar 2026
            </span>
          )}

        </div>
      </div>
    </section>
  );
};

export default Hero;