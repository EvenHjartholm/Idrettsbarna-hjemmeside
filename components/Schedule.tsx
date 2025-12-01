import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEDULE_DATA } from '../constants';
import { Calendar, ChevronRight, Clock, Users } from 'lucide-react';
import { CourseSession } from '../types';

import { Theme } from '../App';
import { trackEvent } from '../utils/analytics';

interface ScheduleProps {
  onSelectCourse: (course: string, serviceId?: string) => void; // Modified type for course
  isModal?: boolean;
  onEnroll?: () => void; // Changed to optional and no args
  courseTitle?: string; // Added courseTitle
}

const Schedule: React.FC<ScheduleProps> = ({ onSelectCourse, isModal = false, onEnroll, courseTitle }) => {
  const navigate = useNavigate();

  const handleSessionClick = (session: CourseSession, day: string) => {
    console.log('Session clicked:', session, day);
    if (session.serviceId) {
      // Create a descriptive string for the course
      // We include ageGroup here so it propagates to the modal title, stripping any asterisk
      const cleanAgeGroup = session.ageGroup.replace(' *', '');
      const courseString = `${session.level}: ${cleanAgeGroup} (${day} ${session.time})`;
      console.log('Enrolling in:', courseString);

      // Track the event
      trackEvent('begin_checkout', {
        event_category: 'Schedule',
        event_label: courseString,
        items: [{
          item_id: session.serviceId,
          item_name: session.level,
          item_category: session.ageGroup,
          item_variant: day
        }]
      });

      onSelectCourse(courseString, session.serviceId);
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
    if (typeof spots === 'number') {
      return spots === 1 ? '1 plass ledig' : `${spots} plasser ledige`;
    }
    return spots;
  }

  return (
    <section id="schedule" className={`${isModal ? 'p-0 bg-transparent' : 'pt-40 pb-24 bg-slate-950'} relative overflow-hidden scroll-mt-32`}>
      {/* Background Elements - Hide in Modal */}
      {!isModal && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${isModal ? '' : 'px-4 sm:px-6 lg:px-8'} relative z-10`}>
        <div className={`text-center ${isModal ? 'mb-8' : 'mb-16'}`}>
          {!isModal && <h2 className="text-sm font-bold text-cyan-400 tracking-widest uppercase mb-3">Oversikt</h2>}
          {/* Modified Header Content */}
          <div className="flex items-center justify-between mb-8">
            {isModal ? (
              <div className="text-center w-full">
                <h2 className="text-xl font-bold text-white mb-2">
                  Velg tidspunkt
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                  Trykk på et <span className="font-medium text-white">{courseTitle?.toLowerCase()}</span> som passer for deg for å gå videre til påmeldingen.
                </p>
              </div>
            ) : (
              <div className="text-center w-full"> {/* Added w-full and text-center for consistency */}
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                  Kurstider Januar 2026
                </h3>
                <p className={`max-w-2xl mx-auto text-base text-txt-secondary ${isModal ? 'text-sm' : ''}`}>
                  Oppstart uke 2 (7. og 8. januar). Varighet 23 kursdager.
                  <br />
                  <span className="text-cyan-400 font-medium">Merk:</span> Ingen kurs i vinterferien (uke 8).
                </p>
              </div>
            )}
          </div>
          {!isModal && (
            <p className="text-xs text-txt-muted italic mt-4">
              * Tidene markert med stjerne er organisert gjennom Asker Triathlonklubb
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {SCHEDULE_DATA.map((dayData, index) => (
            <div key={index} className="bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex flex-col items-start mb-8 pl-3 sm:pl-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                  <Calendar size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{dayData.day}</h3>
                <p className="text-cyan-200 font-medium text-sm mb-2">{dayData.startDate}</p>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">23 kursdager</p>
                <div className="text-sm text-cyan-400 font-medium mt-2 tracking-wide">
                  Risenga svømmehall i Asker
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
                        onClick={() => handleSessionClick(session, dayData.day)}
                        className={`w-full group relative overflow-hidden rounded-lg border transition-all duration-200 ${session.serviceId
                          ? 'bg-tertiary/20 border-white/5 hover:bg-tertiary/40 hover:border-accent/20 hover:shadow-sm cursor-pointer'
                          : 'bg-transparent border-transparent cursor-default opacity-70'
                          }`}
                      >
                        <div className="py-3 px-3 sm:px-4 flex flex-row items-center gap-2 sm:gap-3">
                          {/* Time - Left Column */}
                          <div className="flex flex-col items-start gap-0.5 sm:gap-2 min-w-[65px] sm:min-w-[90px] shrink-0">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors hidden sm:block" />
                              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors tabular-nums leading-tight">
                                {session.time.split(" - ")[0]}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium leading-tight pl-0 sm:pl-6">
                              {session.time.split(" - ")[1]}
                            </span>
                          </div>

                          {/* Middle Column - Content (Left Aligned) */}
                          <div className="flex-1 min-w-0 flex flex-col items-start justify-center border-l border-white/5 pl-3 sm:pl-4">
                            <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors text-sm sm:text-base text-left leading-tight truncate w-full">
                              {session.level}
                            </h4>
                            <p className="text-slate-500 text-xs mt-1 group-hover:text-slate-300 text-left leading-tight w-full">
                              {session.ageGroup}
                            </p>
                          </div>

                          {/* Right Column - Spots & Action */}
                          <div className="flex flex-row items-center justify-end gap-2 shrink-0 min-w-[120px]">
                            {session.spots && (
                              <span className={`text-[10px] whitespace-nowrap w-[85px] flex justify-center ${getSpotTextStyle(session.spots)}`}>
                                {formatSpotText(session.spots)}
                              </span>
                            )}
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors ${session.serviceId
                              ? 'bg-tertiary group-hover:bg-accent/20'
                              : 'bg-white/5'
                              }`}>
                              <ChevronRight className={`w-3 h-3 transition-colors ${session.serviceId
                                ? 'text-txt-muted group-hover:text-accent'
                                : 'text-white/10'
                                }`} />
                            </div>
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