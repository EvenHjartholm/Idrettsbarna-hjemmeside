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
            className="group relative px-8 py-4 bg-accent hover:bg-accent-hover text-primary text-lg font-bold rounded-full transition-all shadow-[0_0_20px_var(--accent-dim)] hover:shadow-[0_0_30px_var(--accent-dim)] hover:-translate-y-1 overflow-hidden"
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

        {/* Badge - "Ny kursrunde" */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-accent/30 bg-secondary/30 backdrop-blur-sm text-sm font-medium tracking-wider uppercase text-txt-secondary shadow-[0_0_15px_rgba(34,211,238,0.05)]">
            <Calendar className="w-4 h-4 text-accent" />
            <span>Ny kursrunde starter <span className="text-accent font-bold">Januar 2026</span></span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-txt-muted">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;