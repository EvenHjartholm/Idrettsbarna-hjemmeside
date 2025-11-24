import React, { useState } from 'react';
import { SCHEDULE_DATA, SERVICES } from '../constants';
import { Calendar, ChevronRight, Info, Clock, MapPin } from 'lucide-react';
import { ServiceItem, CourseSession, SessionContext } from '../types';
import CourseDetailModal from './CourseDetailModal';

interface ScheduleProps {
  onEnroll: (courseName: string) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onEnroll }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [sessionContext, setSessionContext] = useState<SessionContext | null>(null);

  const handleSessionClick = (session: CourseSession, startDate: string, day: string) => {
    if (session.serviceId) {
      const service = SERVICES.find(s => s.id === session.serviceId);
      if (service) {
        setSessionContext({
          startDate: startDate,
          day: day,
          time: session.time,
          level: session.ageGroup
        });
        setSelectedService(service);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setSessionContext(null);
  };

  // Helper to get minimal text color for spots
  const getSpotTextStyle = (spots: number | string | undefined) => {
    if (spots === 'Venteliste') return 'text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded';
    if (spots === 'Få ledige') return 'text-amber-400 font-bold bg-amber-900/20 px-2 py-1 rounded';
    if (typeof spots === 'number') {
      if (spots <= 2) return 'text-amber-400 font-bold bg-amber-900/20 px-2 py-1 rounded';
      return 'text-emerald-400 font-medium bg-emerald-900/20 px-2 py-1 rounded';
    }
    return 'text-slate-500 font-normal';
  };

  const formatSpotText = (spots: number | string | undefined) => {
    if (typeof spots === 'number') return `${spots} plasser`;
    return spots;
  }

  return (
    <section id="schedule" className="py-12 bg-primary relative overflow-hidden scroll-mt-20 transition-colors duration-500">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600 blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-sm md:text-base text-accent font-bold tracking-widest uppercase mb-2">
            Oversikt
          </h2>
          <h2 className="text-3xl md:text-4xl font-extrabold text-txt-primary tracking-tight mb-4">
            Timeplan Januar 2026
          </h2>
          <p className="max-w-2xl mx-auto text-base text-txt-secondary">
            Finn kurset som passer for deg. Trykk på en time for mer informasjon og påmelding.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-center gap-3 text-sm text-txt-secondary bg-secondary/30 p-4 rounded-xl max-w-3xl mx-auto">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Info size={20} className="text-blue-400" />
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-sm">
              Deltager 6 år og oppover må være medlem av <a href="https://askertri.no/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 font-bold transition-colors">Asker triathlon klubb - Trykk her</a>.
            </p>
            <p className="text-txt-muted text-xs">
              Tidene markert med * er organisert gjennom Asker Triathlonklubb.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SCHEDULE_DATA.map((dayData, index) => (
            <div key={index} className="bg-secondary/40 backdrop-blur-md rounded-2xl p-5 border border-border shadow-2xl flex flex-col h-full hover:border-border/80 transition-colors">
              {/* Header */}
              <div className="flex items-center justify-start mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-1">
                    <Calendar className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-txt-primary">{dayData.day}</h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <p className="text-accent font-medium text-sm">{dayData.startDate}</p>
                      <p className="text-txt-muted text-xs">{dayData.durationInfo}</p>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-1 flex-1">
                {dayData.sessions.map((session, sIndex) => (
                  <li key={sIndex}>
                    {session.time === "---" ? (
                      <div className="w-full text-center py-4 mt-2 mb-1">
                        <span className="text-[10px] font-bold text-txt-muted uppercase tracking-[0.2em] px-4 py-2 border-b border-white/10">{session.level}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSessionClick(session, dayData.startDate, dayData.day)}
                        className={`w-full group relative overflow-hidden rounded-lg border transition-all duration-200 ${session.serviceId
                          ? 'bg-tertiary/20 border-white/5 hover:bg-tertiary/40 hover:border-accent/20 hover:shadow-sm cursor-pointer'
                          : 'bg-transparent border-transparent cursor-default opacity-70'
                          }`}
                      >
                        <div className="py-2 px-3 flex flex-col sm:flex-row sm:items-center gap-3">
                          {/* Time */}
                          <div className="flex items-center gap-2 min-w-[110px]">
                            <Clock size={14} className="text-txt-muted group-hover:text-accent transition-colors" />
                            <div className="text-left">
                              <span className="block text-base font-bold text-txt-primary group-hover:text-accent transition-colors tabular-nums leading-tight">
                                {session.time.split(" - ")[0]}
                              </span>
                              <span className="text-[10px] text-txt-muted font-medium leading-tight">
                                {session.time.split(" - ")[1]}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-left border-l border-white/5 pl-3 sm:pl-4">
                            <h4 className="text-txt-secondary font-bold group-hover:text-txt-primary transition-colors text-sm">
                              {session.level}
                            </h4>
                            <p className="text-txt-muted text-xs mt-0.5 group-hover:text-txt-secondary">{session.ageGroup}</p>
                          </div>

                          {/* Action / Spots */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0 w-full sm:w-auto pl-3 sm:pl-0 border-t sm:border-t-0 border-border pt-2 sm:pt-0">
                            {session.spots && (
                              <span className={`text-[10px] whitespace-nowrap ${getSpotTextStyle(session.spots)}`}>
                                {formatSpotText(session.spots)}
                              </span>
                            )}

                            {session.serviceId && (
                              <div className="w-6 h-6 rounded-full bg-tertiary group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                                <ChevronRight className="w-3 h-3 text-txt-muted group-hover:text-accent transition-colors" />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <CourseDetailModal
        isOpen={!!selectedService}
        onClose={handleCloseModal}
        course={selectedService}
        sessionContext={sessionContext}
        onEnroll={onEnroll}
      />
    </section>
  );
};

export default Schedule;