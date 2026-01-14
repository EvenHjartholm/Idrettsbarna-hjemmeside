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
  onSeeSchedule: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onEnroll, theme, onSelectService, onSeeSchedule }) => {
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


  if (theme === 'nordic') {
    return (
      <section id="services" className="relative transition-colors duration-500 py-32 lg:py-48 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

            <div className="text-center mb-20 lg:mb-32 space-y-6 relative z-10">
                
                {/* Campaign Banner - Moved here for all screens to avoid menu overlap */}
                <div className="mb-8 animate-fade-in-up w-full flex justify-center">
                    <div className="inline-flex flex-col md:flex-row items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm mx-4">
                        <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                            Kampanje
                        </span>
                        <div className="text-center md:text-left flex flex-col md:flex-row md:items-center md:gap-2">
                            <p className="text-emerald-900 text-sm font-medium leading-tight max-w-xs md:max-w-none mx-auto md:mx-0">
                                <span className="font-bold">40% rabatt</span> på babysvømming onsdager og torsdager kl. 15:00.
                            </p>
                            <p className="text-emerald-700 font-normal text-xs opacity-80 hidden md:block">
                                -
                            </p>
                            <p className="text-emerald-700 font-normal text-xs opacity-80">
                                (Kun 10 plasser. Merk med '40% rabatt')
                            </p>
                        </div>
                    </div>
                </div>

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
                            <div className="relative h-48 lg:h-64 overflow-hidden bg-slate-100">
                                <img
                                   src={service.imageUrl}
                                   alt={service.title}
                                   loading="lazy"
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
                                        aria-label={`Les mer om ${service.title}`}
                                        className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-slate-900 transition-colors px-4 py-3"
                                    >
                                        Les mer
                                    </button>
                                    <div className="w-[1px] h-8 bg-slate-200"></div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSeeSchedule(service.id);
                                        }}
                                        aria-label={`Se tider for ${service.title}`}
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
        
        {/* Campaign Banner - Default Theme */}
        <div className="mb-10 flex justify-center animate-fade-in-up">
            <div className="inline-flex flex-col md:flex-row items-center gap-2 bg-[#0f172a] border border-cyan-500/30 rounded-2xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] mx-4 text-center md:text-left max-w-2xl">
                <span className="bg-cyan-500 text-slate-900 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)] whitespace-nowrap">
                    Kampanje
                </span>
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <p className="text-white text-sm font-medium leading-tight mt-1 md:mt-0">
                    <span className="font-bold text-cyan-300">40% rabatt</span> på babysvømming ons/tor kl. 15.
                    </p>
                    <p className="text-slate-400 font-normal text-xs">
                    (Merk med '40% rabatt')
                    </p>
                </div>
            </div>
        </div>

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
                    loading="lazy"
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

                  <div 
                    aria-label={`Les mer om ${service.title}`}
                    className={`flex items-center text-accent text-sm font-medium transition-transform ${isActive
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