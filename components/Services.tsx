import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Theme } from '../types';
import { Baby, Users, LifeBuoy, School, GraduationCap, ArrowRight, HelpCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import SeaCreature from './SeaCreature';

const Icons = {
  Baby: Baby,
  Waves: Users,
  School: School,
  LifeBuoy: LifeBuoy,
  GraduationCap: GraduationCap,
  HelpCircle: HelpCircle
};

interface ServicesProps {
  onEnroll: (courseName: string, serviceId?: string) => void;
  theme?: Theme;
  onSelectService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onEnroll, theme, onSelectService }) => {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Only run on mobile/tablet where hover isn't primary
    if (window.matchMedia('(hover: hover)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCardId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -25% 0px', // Activate when element is in the middle 50% of viewport
        threshold: 0
      }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [theme]);

  // LUXURY THEME (Gold)
  if (theme === 'luxury') {
    return (
      <section id="services" className="relative transition-colors duration-500 py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-accent text-xs font-serif italic tracking-[0.2em] uppercase border-b border-accent/30 pb-2">
              Vårt Tilbud
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-6 mb-4">
              Kursoversikt
            </h2>
          </div>

          <div className="space-y-20">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center group cursor-pointer`}
                  onClick={() => onSelectService(service.id)}
                >
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 border border-accent/20 z-10 m-2 transition-all duration-700 group-hover:m-0 group-hover:border-accent/60" />
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale-[30%] transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-10' : 'md:pr-10'} text-center md:text-left`}>
                    <h3 className="text-3xl font-serif text-white mb-6 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-stone-400 text-lg leading-relaxed mb-8 font-light">
                      {service.description}
                    </p>
                    <button className="text-accent text-sm uppercase tracking-[0.2em] border-b border-accent/30 pb-1 hover:border-accent transition-all">
                      Les mer om kurset
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // BW THEME (Structure/Photo)
  if (theme === 'bw') {
    return (
      <section id="services" className="relative transition-colors duration-500 py-24 bg-white text-black">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="mb-20 border-b-4 border-black pb-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">
              Kurskatalog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                  {/* Number Overlay */}
                  <div className="absolute top-0 left-0 bg-black text-white text-4xl font-black p-4 leading-none">
                    0{index + 1}
                  </div>
                </div>

                <div className="border-l-4 border-black pl-6 transition-all duration-300 group-hover:border-zinc-400 group-hover:pl-8">
                  <h3 className="text-3xl font-black uppercase mb-3 tracking-tight group-hover:underline decoration-4 underline-offset-4">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 font-medium leading-snug mb-4 max-w-sm">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm">
                    Les mer <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // NORDIC THEME (Architectural/Clean)
  if (theme === 'nordic') {
    return (
      <section id="services" className="relative transition-colors duration-500 py-32 lg:py-48 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            {/* Sea Creature: Fish swimming in overview */}
            <SeaCreature 
                type="fish" 
                animation="swim-right" 
                theme={theme} 
                className="absolute top-20 -left-10 lg:left-10 z-0 opacity-40 pointer-events-none" 
                delay={3} 
            />
            <div className="text-center mb-20 lg:mb-32 space-y-6 relative z-10">

                <h2 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight">
                   Våre Kurs <span className="italic text-slate-500 font-light block text-2xl mt-2">Informasjon & Påmelding</span>
                </h2>
                <div className="w-24 h-[1px] bg-slate-200 mx-auto mt-8"/>
                <p className="text-slate-500 max-w-xl mx-auto italic font-serif">
                   Her finner du informasjon om nivåene. For å melde deg på, <button onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })} className="underline text-slate-800 hover:text-amber-700">gå til kurstider</button> lenger ned.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12">
                {SERVICES.map((service, index) => {
                    const Icon = Icons[service.iconName as keyof typeof Icons] || Icons.HelpCircle;
                    const isActive = activeCardId === service.id; // From IntersectionObserver
                    
                    return (
                        <div 
                           key={service.id}
                           id={service.id} // Important for observer
                           onClick={() => onSelectService(service.id)}
                           className={`service-card group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col transition-all duration-700 ease-out transform ${
                               isActive 
                                 ? 'scale-[1.02] shadow-2xl translate-y-[-8px]' 
                                 : 'scale-100 hover:shadow-2xl hover:-translate-y-2'
                           }`}
                        >
                            <div className="relative h-72 lg:h-64 overflow-hidden bg-slate-100">
                                <img
                                   src={service.imageUrl}
                                   alt={service.title}
                                   className={`w-full h-full object-cover grayscale transition-transform duration-[1.5s] ${
                                       isActive ? 'scale-110' : 'group-hover:scale-110'
                                   }`}
                                />
                                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm z-10">
                                    <Icon size={18} className="text-slate-800" />
                                </div>
                                {service.ageRange && (
                                  <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm z-10">
                                    <span className="text-[10px] uppercase tracking-widest font-semibold text-white/95">{service.ageRange}</span>
                                  </div>
                                )}
                            </div>
                            
                            <div className="p-8 lg:p-10 flex-1 flex flex-col items-center text-center">
                                <h3 className={`text-3xl font-serif mb-4 transition-all duration-300 leading-tight origin-center transform group-hover:scale-105 ${
                                    isActive ? 'text-slate-900' : 'text-slate-900'
                                }`}>
                                    {service.title}
                                </h3>
                                <p className="text-slate-500 font-light text-lg leading-relaxed mb-8 flex-1">
                                    {service.description}
                                </p>
                                
                                <div className="flex items-center justify-between w-full pt-6 border-t border-slate-100 mt-auto">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectService(service.id);
                                        }}
                                        className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-slate-900 transition-colors px-4 py-3"
                                    >
                                        Les mer
                                    </button>
                                    <div className="w-[1px] h-8 bg-slate-200"></div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-xs uppercase tracking-[0.2em] font-bold text-amber-700 hover:text-amber-800 transition-colors flex items-center gap-2 px-4 py-3"
                                    >
                                        Se tider <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>
    );
  }

  // DEFAULT THEME (Ocean/Refined)
  return (
    <section id="services" className="relative transition-colors duration-500 py-24 bg-primary">
      {/* Standard Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Våre Kurs
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-400">
            Fra de første plaskene til trygg svømming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, index) => {
            const Icon = Icons[service.iconName as keyof typeof Icons] || Icons.HelpCircle;
            const isActive = activeCardId === service.id;

            return (
              <div
                key={service.id}
                id={service.id}
                onClick={() => onSelectService(service.id)}
                className={`service-card group relative bg-[#0f172a] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${isActive
                  ? 'shadow-lg shadow-cyan-500/20 border-cyan-500/30'
                  : 'border-cyan-500/10 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/30'
                  }`}
              >
                {/* Image Overlay */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className={`w-full h-full object-cover transition-transform duration-700 grayscale contrast-125 ${isActive
                      ? 'scale-105 opacity-100'
                      : 'opacity-90 group-hover:scale-105 group-hover:opacity-100'
                      }`}
                  />
                  <div className={`absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-lg border transition-colors ${isActive
                    ? 'border-white/20'
                    : 'border-white/5 group-hover:border-white/20'
                    }`}>
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  {service.ageRange && (
                    <div className="absolute top-4 left-4 z-20 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-lg">
                      <span className="text-[10px] font-semibold text-white/90 uppercase tracking-widest">{service.ageRange}</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive
                    ? 'text-accent'
                    : 'text-txt-primary group-hover:text-accent'
                    }`}>
                    {service.title}
                  </h3>
                  <p className="text-txt-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  <div className={`flex items-center text-accent text-sm font-medium transition-transform ${isActive
                    ? 'translate-x-1'
                    : 'group-hover:translate-x-1'
                    }`}>
                    Les mer <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;