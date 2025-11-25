import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEDULE_DATA } from '../constants';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { CourseSession } from '../types';

interface ScheduleProps {
  onEnroll: (courseName: string) => void;
}

const Schedule: React.FC<ScheduleProps> = () => {
  const navigate = useNavigate();

  const handleSessionClick = (session: CourseSession) => {
    if (session.serviceId) {
      navigate(`/kurs/${session.serviceId}`);
    }
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
    <section id="schedule" className="pt-40 pb-24 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-3">Oversikt</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Timeplan Januar 2026
          </h3>
          <p className="max-w-2xl mx-auto text-base text-txt-secondary">
            Finn kurset som passer for deg. Trykk på en time for mer informasjon og påmelding.
          </p>
          <p className="text-xs text-txt-muted italic mt-4">
            * Tidene markert med stjerne er organisert gjennom Asker Triathlonklubb
          </p>
        </div>

        {/* Info Banner removed - moved to Contact Form */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SCHEDULE_DATA.map((dayData, index) => (
            <div key={index} className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden">
              {/* Day Header */}
              <div className="p-8 border-b border-white/5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-950/30 rounded-2xl border border-white/5">
                    <Calendar className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{dayData.day}</h4>
                    <p className="text-cyan-200 font-medium">
                      {dayData.startDate}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {dayData.durationInfo}
                    </p>
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
                        onClick={() => handleSessionClick(session)}
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
    </section>
  );
};

export default Schedule;