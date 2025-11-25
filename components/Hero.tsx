import React from 'react';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary transition-colors duration-500">
      {/* Abstract Background Elements - Organic Pulsing */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-txt-primary mb-6 drop-shadow-2xl animate-fade-in-up">
          <span className="block text-accent">Idrettsbarna</span>
          <span className="block text-2xl md:text-4xl lg:text-5xl mt-2 font-medium text-txt-secondary">
            Svømmeglede for alle
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-txt-muted mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Trygghet i vann, mestring og glede gjennom lekbetont læring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 text-lg font-bold rounded-full transition-all border border-cyan-200/30 hover:border-cyan-200/50 backdrop-blur-sm overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Meld på kurs <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button
            onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-border bg-secondary/50 backdrop-blur-md text-lg font-medium rounded-full text-txt-primary hover:bg-white/5 hover:border-accent/50 transition-all hover:-translate-y-1"
          >
            Se Timeplan
          </button>
        </div>

        {/* Badge removed - moved to bottom arrow */}
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce flex flex-col items-center gap-4 text-txt-muted/80">
          <span className="text-sm font-medium tracking-widest uppercase border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
            Ny kursrunde starter januar 2026
          </span>
          <ChevronDown size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;