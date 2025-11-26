import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
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
  onEnroll: (courseName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onEnroll }) => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-24 bg-primary relative transition-colors duration-500">
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
          {SERVICES.map((service) => {
            const Icon = Icons[service.iconName as keyof typeof Icons] || Icons.HelpCircle;

            return (
              <div
                key={service.id}
                onClick={() => navigate(`/kurs/${service.id}`)}
                className="group relative bg-[#0f172a] rounded-2xl overflow-hidden border border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image Overlay */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={`${import.meta.env.BASE_URL}${service.imageUrl}`}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 grayscale contrast-125"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/5 group-hover:border-white/20 transition-colors">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-txt-primary mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-txt-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
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