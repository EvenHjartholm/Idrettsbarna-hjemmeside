import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Theme } from '../App';
import { Baby, Users, LifeBuoy, School, GraduationCap, ArrowRight, HelpCircle } from 'lucide-react';
import { ServiceItem } from '../types';

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
        rootMargin: '-40% 0px -40% 0px', // Activate when element is in the middle 20% of viewport
        threshold: 0
      }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [theme]); // Re-run if theme changes (though layout changes might need more deps)

  return (
    <section id="services" className={`relative transition-colors duration-500 ${theme === 'photo' ? 'bg-black' : 'py-24 bg-primary'}`}>
      {theme === 'photo' ? (
        /* Hasselblad-style Vertical Layout */
        <div className="flex flex-col w-full">
          {SERVICES.map((service, index) => (
            <div key={service.id} className="relative w-full h-screen flex flex-col justify-end pb-12 items-center text-center px-4 overflow-hidden group border-b-[8px] border-white">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mb-12">
                <h3 className="text-3xl md:text-5xl font-sans font-light text-white tracking-[0.2em] uppercase mb-4 drop-shadow-xl">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg text-white/90 font-light tracking-widest mb-8 max-w-2xl">
                  {service.description}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="px-6 py-2 border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[140px]"
                  >
                    Les Mer
                  </button>
                  <button
                    onClick={() => onEnroll(service.title, service.id)}
                    className="px-6 py-2 border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[140px]"
                  >
                    Meld På
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard Grid Layout */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-accent font-semibold tracking-wide uppercase">Våre Kurs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-txt-primary sm:text-4xl">
              Opplæring for alle aldre
            </p>
            <p className="mt-4 max-w-2xl text-xl text-txt-secondary mx-auto">
              Fra de første plaskene til trygg svømming.
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
      )}
    </section>
  );
};

export default Services;