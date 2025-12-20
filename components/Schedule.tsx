import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEDULE_DATA } from '../constants';
import { Calendar, ChevronRight, Clock, Users, ArrowRight } from 'lucide-react';
import { CourseSession } from '../types';

import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';

interface ScheduleProps {
  onSelectCourse: (course: string, serviceId?: string) => void;
  isModal?: boolean;
  courseTitle?: string;
  theme?: Theme;
}

const Schedule: React.FC<ScheduleProps> = ({ onSelectCourse, isModal = false, courseTitle, theme }) => {
  const navigate = useNavigate();

  const handleSessionClick = (session: CourseSession, day: string) => {
    console.log('Session clicked:', session, day);
    if (session.serviceId) {
      const cleanAgeGroup = session.ageGroup.replace(' *', '');
      const courseString = `${session.level}: ${cleanAgeGroup} (${day} ${session.time})`;

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

  const getSpotTextStyle = (spots: number | string | undefined) => {
    if (typeof spots === 'string' && spots.startsWith('Venteliste')) return 'text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded';
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

  // Hooks must be at the top level
  const [focusedSessionId, setFocusedSessionId] = React.useState<string | null>(null);
  const [activeDay, setActiveDay] = React.useState<string | null>(null); // For Main Page Scroll Spy

  // Scroll Spy for Main Page (Nordic Theme)
  React.useEffect(() => {
    if (theme !== 'nordic' || isModal) return;

    const handleScroll = () => {
        // Trigger point: fixed offset from top (header height approx 150-200px)
        const triggerPoint = 250; 
        let activeSection = null;

        for (const dayData of SCHEDULE_DATA) {
            const el = document.getElementById(`schedule-day-${dayData.day}`);
            if (el) {
                const rect = el.getBoundingClientRect();
                // Check if this section contains the trigger point
                if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                    activeSection = dayData.day;
                    break;
                }
            }
        }
        
        // Fallback for bottom of page
        if (!activeSection) {
             const lastDay = SCHEDULE_DATA[SCHEDULE_DATA.length - 1];
             const el = document.getElementById(`schedule-day-${lastDay.day}`);
             if (el) {
                 const rect = el.getBoundingClientRect();
                 if (rect.top < triggerPoint) {
                     activeSection = lastDay.day;
                 }
             }
        }

        if (activeSection && activeSection !== activeDay) {
            setActiveDay(activeSection);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme, isModal]);

  React.useEffect(() => {
    // Only run intersection observer if we are in a mode that uses it (Nordic/Modal)
    // But hooks must execute unconditionally. We can check inside the effect or just let it run.
    // For performance, we can conditionalize the *logic* inside, but for simplicity/correctness of hooks, let's just clean up correctly.
    // Actually, looking at the logic, it selects elements by class '.session-card-nordic' or '.session-card-modal'.
    // If those elements don't exist (other themes), it just observes nothing. Safe.
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setFocusedSessionId(entry.target.id);
                }
            });
        },
        {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // Widen focus area (middle 60%) to catch cards easier on mobile
            threshold: 0.1
        }
    );

    // Nordic cards
    const nordicCards = document.querySelectorAll('.session-card-nordic');
    nordicCards.forEach((card) => observer.observe(card));

    // Modal cards (also used in Nordic theme)
    const modalCards = document.querySelectorAll('.session-card-modal');
    modalCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [theme, isModal]); // Re-run if theme changes just in case DOM needs to update first

  // LUXURY THEME (Gold)
  if (theme === 'luxury' && !isModal) {
    return (
      <section id="schedule" className="py-32 bg-neutral-900 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-accent text-xs font-serif italic tracking-[0.2em] uppercase border-b border-accent/30 pb-2">
              Tidspunkt
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-6 mb-4">
              Kursoversikt Januar 2026
            </h2>
            <p className="text-stone-400 font-light italic">
              Oppstart uke 2 • 23 kursdager
            </p>
          </div>

          {/* Sticky Mobile Nav (Gold) */}
          <div className="lg:hidden sticky top-16 md:top-20 z-30 flex gap-2 overflow-x-auto pb-4 mb-8 bg-neutral-900/95 backdrop-blur-sm p-4 -mx-4 border-b border-white/5">
             {SCHEDULE_DATA.map((dayData, index) => (
                <button
                   key={index}
                   onClick={() => {
                        const el = document.getElementById(`schedule-day-${dayData.day}`);
                        const offset = 140; // Increased offset so header isn't hidden by double-sticky
                        if(el) {
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = el.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                   }}
                   className="flex-shrink-0 px-4 py-2 border border-accent/50 text-accent font-serif text-sm rounded-full bg-neutral-800"
                >
                   Gå til {dayData.day}
                </button>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {SCHEDULE_DATA.map((dayData, index) => (
              <div key={index} id={`schedule-day-${dayData.day}`} className="relative scroll-mt-48">
                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
                <h3 className="text-3xl font-serif text-white mb-8 pl-6 border-l-2 border-accent">
                  {dayData.day}
                </h3>

                <div className="space-y-6 pl-6">
                  {dayData.sessions.map((session, sIndex) => (
                    <div key={sIndex} className="group">
                      {session.time === "---" ? (
                        <div className="py-4 text-accent/60 font-serif italic text-sm text-center border-t border-white/5 mt-4">
                          {session.level}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSessionClick(session, dayData.day)}
                          disabled={!session.serviceId}
                          className={`w-full text-left transition-all duration-300 ${session.serviceId
                            ? 'hover:pl-4 cursor-pointer'
                            : 'opacity-50 cursor-default'}`}
                        >
                          <div className="flex items-baseline justify-between border-b border-white/5 pb-4 group-hover:border-accent/30">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-1">
                                <span className="text-accent font-serif text-lg w-16">
                                  {session.time.split(" - ")[0]}
                                </span>
                                <span className="text-white font-medium tracking-wide group-hover:text-accent transition-colors">
                                  {session.level}
                                </span>
                              </div>
                              <p className="text-stone-500 text-sm pl-20">
                                {session.ageGroup}
                              </p>
                            </div>

                            {session.serviceId && (
                              <div className="text-accent/0 group-hover:text-accent transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                <ArrowRight size={16} />
                              </div>
                            )}
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // BW THEME (Structure)
  if (theme === 'bw' && !isModal) {
    return (
      <section id="schedule" className="py-24 bg-white text-black scroll-mt-32 border-t-8 border-black">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-black pb-8">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
              TIDS<br />PLAN
            </h2>
            <div className="text-right mt-8 md:mt-0">
              <p className="text-xl font-bold uppercase tracking-widest">Januar 2026</p>
              <p className="text-zinc-500 font-medium">Oppstart uke 2 • 23 kursdager</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            {SCHEDULE_DATA.map((dayData, index) => (
              <div key={index} className="border-4 border-black p-8">
                <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-4">
                  <h3 className="text-4xl font-black uppercase">{dayData.day}</h3>
                  <span className="bg-black text-white px-3 py-1 font-bold text-sm uppercase">
                    Risenga
                  </span>
                </div>

                <div className="space-y-0 divide-y-2 divide-zinc-100">
                  {dayData.sessions.map((session, sIndex) => (
                    <div key={sIndex}>
                      {session.time === "---" ? (
                        <div className="py-3 bg-zinc-100 text-center font-bold uppercase tracking-widest text-xs">
                          {session.level}
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSessionClick(session, dayData.day)}
                          disabled={!session.serviceId}
                          className={`w-full py-4 flex items-center justify-between group transition-colors ${session.serviceId
                            ? 'hover:bg-black hover:text-white cursor-pointer px-4 -mx-4 w-[calc(100%+2rem)]'
                            : 'opacity-40 cursor-default'}`}
                        >
                          <div className="flex items-center gap-6">
                            <span className="font-mono font-bold text-lg">
                              {session.time.split(" - ")[0]}
                            </span>
                            <div className="flex flex-col items-start">
                              <span className="font-bold uppercase tracking-tight">
                                {session.level}
                              </span>
                              <span className="text-xs font-medium text-zinc-500 group-hover:text-zinc-400 uppercase">
                                {session.ageGroup}
                              </span>
                            </div>
                          </div>

                          {session.serviceId && (
                            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // NORDIC THEME (Clean/Architectural)
  if (theme === 'nordic' && !isModal) {
    // Hooks moved to top level


    return (
      <section id="schedule" className="py-32 bg-[#FAFAF9] scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
                <span className="text-slate-500 text-xs tracking-[0.2em] uppercase font-semibold">
                   Oppstart Januar 2026
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                   Velg ditt kurs
                </h2>
                <div className="w-24 h-[1px] bg-slate-200 mx-auto mt-8"/>
                 <p className="text-slate-600 font-light italic">
                  23 kursdager • Risenga Svømmehall
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Sticky Mobile Nav (Nordic) */}
                <div className="lg:hidden col-span-1 sticky top-[64px] md:top-[80px] z-30 bg-[#FAFAF9]/95 backdrop-blur-md pt-8 pb-5 -mx-6 px-6 border-b border-slate-200/60 flex flex-col gap-3 shadow-sm transition-all text-left">
                   <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">
                       <span className="bg-slate-900 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">1</span>
                       TRINN 1: VELG DITT KURS
                   </div>
                   <div className="flex gap-3 overflow-x-auto no-scrollbar">
                       {SCHEDULE_DATA.map((dayData, index) => {
                          const isActive = activeDay === dayData.day;
                          return (
                              <button
                                 key={index}
                                 onClick={() => {
                                    const el = document.getElementById(`schedule-day-${dayData.day}`);
                                    const offset = 280; 
                                    if(el) {
                                        const bodyRect = document.body.getBoundingClientRect().top;
                                        const elementRect = el.getBoundingClientRect().top;
                                        const elementPosition = elementRect - bodyRect;
                                        const offsetPosition = elementPosition - offset;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: "smooth"
                                        });
                                        // Optimistic update
                                        setActiveDay(dayData.day);
                                    }
                                 }}
                                 className={`flex-shrink-0 px-8 py-3 font-serif tracking-wide text-sm rounded-full whitespace-nowrap transition-all duration-200
                                    ${isActive
                                        ? 'bg-white text-slate-900 border-2 border-slate-900 font-medium'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900'
                                    }`}
                              >
                                 {dayData.day} &darr;
                              </button>
                          );
                       })}
                   </div>
                </div>

                {SCHEDULE_DATA.map((dayData, index) => (
                    <div key={index} id={`schedule-day-${dayData.day}`} className="space-y-8 scroll-mt-32">
                        {/* Day Header - Sticky */}
                        <div className="sticky top-[196px] md:top-[212px] lg:top-[80px] z-20 flex flex-col gap-1 border-b border-slate-200 pb-6 bg-[#FAFAF9]/95 backdrop-blur-sm pt-4 lg:pt-8 transition-all">
                            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                <span className="bg-slate-900 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">2</span>
                                TRINN 2: VELG TID FOR {dayData.day.toUpperCase()}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mt-2">
                                <h3 className="text-3xl md:text-4xl font-serif text-slate-900">
                                    {dayData.day}
                                </h3>
                                <span className="text-slate-500 font-serif italic text-lg">
                                    {dayData.startDate}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                             {dayData.sessions.map((session, sIndex) => {
                                 const isActive = !!session.serviceId;
                                 const sessionId = `session-${index}-${sIndex}`;
                                 const isFocused = focusedSessionId === sessionId;
                                 
                                 // Helper for Nordic Spot Styles
                                 const getNordicSpotClass = (spots: number | string | undefined) => {
                                     if (typeof spots === 'string' && spots.startsWith('Venteliste')) return 'bg-slate-100 text-slate-500 border border-slate-200';
                                     const num = typeof spots === 'number' ? spots : 10; // Default to safe
                                     if (num <= 2 || spots === 'Få ledige') return 'bg-slate-900 text-white';
                                     return 'bg-slate-50 text-slate-600 border border-slate-200';
                                 };

                                 return (
                                    <div key={sIndex}>
                                        {session.time === "---" ? (
                                             <div className="py-4 text-center border-b border-slate-100">
                                                 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                     {session.level}
                                                 </span>
                                             </div>
                                        ) : (
                                            <button 
                                                id={sessionId}
                                                type="button"
                                                onClick={() => handleSessionClick(session, dayData.day)}
                                                disabled={!isActive}
                                                className={`session-card-nordic w-full group text-left px-4 py-2 md:px-5 md:py-3 rounded-xl transition-all duration-300 border relative z-10 overflow-hidden min-h-[4rem] md:min-h-[5.5rem] transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-md ${isActive 
                                                    ? `cursor-pointer ${isFocused 
                                                        ? 'bg-white shadow-lg border-slate-300 ring-1 ring-slate-100 lg:shadow-sm lg:border-slate-100 lg:ring-0' 
                                                        : 'bg-white shadow-sm border-slate-100'}`
                                                    : 'bg-slate-50 opacity-60 cursor-default border-slate-100'}`}
                                            >
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-3">
                                                    
                                                    {/* Left: Time & Content */}
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                                                        <div className="flex flex-col border-l-[3px] border-slate-200 pl-3 py-0.5 shrink-0 transition-colors group-hover:border-slate-900">
                                                            <span className={`font-serif text-xl text-slate-900`}>
                                                                {session.time.split(" - ")[0]}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex flex-col space-y-1 min-w-0">
                                                             <h4 className={`font-serif text-xl md:text-2xl text-slate-900 leading-tight truncate`}>
                                                                 {session.level}
                                                             </h4>
                                                             <div className="flex flex-wrap items-center gap-3">
                                                                 <div className="flex items-center gap-2">
                                                                     <Users size={12} className="text-slate-400" />
                                                                     <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                                                         {session.ageGroup}
                                                                     </p>
                                                                 </div>
                                                             </div>
                                                         </div>
                                                    </div>

                                                    {/* Right: Spots & Action */}
                                                    {/* Desktop Right: Spots & Action */}
                                                    <div className="hidden sm:flex flex-col items-end justify-center shrink-0 border-l border-slate-100 min-w-[90px] self-stretch gap-1.5 pl-3">
                                                        
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${session.serviceId
                                                            ? 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'
                                                            : 'bg-slate-50 text-slate-200'
                                                        }`}>
                                                            <ChevronRight size={16} />
                                                        </div>

                                                        {session.spots && (
                                                            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                                                                {typeof session.spots === 'number' 
                                                                    ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                                                    : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Mobile Footer: Spots Left, Arrow Right */ }
                                                    <div className="flex sm:hidden items-center justify-between w-full pt-3 mt-3 border-t border-slate-100">
                                                        {session.spots && (
                                                            <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                                                                {typeof session.spots === 'number' 
                                                                    ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                                                    : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                                                            </span>
                                                        )}
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${session.serviceId
                                                            ? 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'
                                                            : 'bg-slate-50 text-slate-200'
                                                        }`}>
                                                            <ChevronRight size={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                 );
                             })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    );
  }

  // NORDIC THEME (Modal Version)
  if (theme === 'nordic' && isModal) {
      // Hooks moved to top level


    return (
      <div className="space-y-8 p-6 md:p-8">
          {SCHEDULE_DATA.map((dayData, index) => (
              <div key={index} id={`modal-day-${dayData.day}`} className="space-y-6 scroll-mt-48">
                  {/* Day Header - Sticky */}
                  <div className="sticky top-[160px] md:top-[170px] z-20 flex flex-col gap-1 border-b border-slate-200 pb-3 bg-white/95 backdrop-blur-sm pt-2 -mx-2 px-2 transition-all">
                       <div className="flex items-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
                          <span className="bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                          TRINN 2: VELG TID FOR {dayData.day.toUpperCase()}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                          <h3 className="text-2xl font-serif text-slate-900">
                              {dayData.day}
                          </h3>
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] uppercase tracking-wider font-semibold rounded-full">
                              {dayData.startDate}
                          </span>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dayData.sessions.map((session, sIndex) => {
                            const isActive = !!session.serviceId;
                            const sessionId = `modal-session-${index}-${sIndex}`;
                            const isFocused = focusedSessionId === sessionId;
                            
                            // Helper for Nordic Spot Styles
                            const getNordicSpotClass = (spots: number | string | undefined) => {
                                if (typeof spots === 'string' && spots.startsWith('Venteliste')) return 'bg-slate-100 text-slate-500 border border-slate-200';
                                const num = typeof spots === 'number' ? spots : 10;
                                if (num <= 2 || spots === 'Få ledige') return 'bg-slate-900 text-white';
                                return 'bg-slate-50 text-slate-600 border border-slate-200';
                            };

                            return (
                               <div key={sIndex}>
                                   {session.time === "---" ? (
                                        <div className="py-3 text-center border-b border-slate-100">
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                                {session.level}
                                            </span>
                                        </div>
                                   ) : (
                                       <button 
                                           id={sessionId}
                                           type="button"
                                           onClick={() => handleSessionClick(session, dayData.day)}
                                           disabled={!isActive}
                                           className={`session-card-nordic w-full group text-left px-5 py-6 rounded-xl transition-all duration-300 border relative z-10 overflow-hidden min-h-[5.5rem] transform hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md ${isActive 
                                               ? `cursor-pointer ${isFocused
                                                   ? '!bg-white !shadow-2xl !scale-110 !z-30 !border-slate-900 !ring-4 !ring-slate-100 lg:shadow-sm lg:border-slate-100 lg:ring-0 lg:scale-100 lg:z-0'
                                                   : 'bg-white shadow-sm border-slate-100 scale-100'}`
                                               : 'bg-slate-50 opacity-60 cursor-default border-slate-100'}`}
                                       >
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                                
                                                {/* Left: Time & Content */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                                                    <div className="flex flex-col border-l-[3px] border-slate-200 pl-3 py-0.5 shrink-0 transition-colors group-hover:border-slate-900">
                                                        <span className={`font-serif text-xl text-slate-900`}>
                                                            {session.time.split(" - ")[0]}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex flex-col space-y-1 min-w-0">
                                                         <h4 className={`font-serif !text-4xl md:!text-5xl text-slate-900 leading-tight truncate`}>
                                                             {session.level}
                                                         </h4>
                                                         <div className="flex flex-wrap items-center gap-3">
                                                             <div className="flex items-center gap-2">
                                                                 <Users size={12} className="text-slate-400" />
                                                                 <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                                                     {session.ageGroup}
                                                                 </p>
                                                             </div>
                                                         </div>
                                                     </div>
                                                </div>

                                                {/* Right: Spots & Action */}
                                                {/* Desktop Right: Spots & Action */}
                                                <div className="hidden sm:flex flex-col items-end justify-center shrink-0 border-l border-slate-100 min-w-[90px] self-stretch gap-1.5 pl-3">
                                                    
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${session.serviceId
                                                        ? 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'
                                                        : 'bg-slate-50 text-slate-200'
                                                    }`}>
                                                        <ChevronRight size={16} />
                                                    </div>

                                                    {session.spots && (
                                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                                                            {typeof session.spots === 'number' 
                                                                ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                                                : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Mobile Footer: Spots Left, Arrow Right */}
                                                <div className="flex sm:hidden items-center justify-between w-full pt-2 mt-2 border-t border-slate-100">
                                                    {session.spots && (
                                                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                                                            {typeof session.spots === 'number' 
                                                                ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                                                : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                                                        </span>
                                                    )}
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${session.serviceId
                                                        ? 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'
                                                        : 'bg-slate-50 text-slate-200'
                                                    }`}>
                                                        <ChevronRight size={14} />
                                                    </div>
                                                </div>
                                           </div>
                                       </button>
                                   )}
                               </div>
                            );
                        })}
                  </div>
              </div>
          ))}
      </div>
    );
  }

  // DEFAULT THEME (Ocean/Refined)
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
          {isModal ? (
            <div className="text-center w-full pt-8">
              <h2 className="text-xl font-bold text-white mb-2">
                Velg tidspunkt
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                Velg ett kurs som passer for deg.
              </p>
            </div>
          ) : (
            <div className="text-center w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Kurstider Januar 2026
              </h3>
              <div className="flex flex-col items-center gap-3 text-slate-300">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-base">
                  <span>Oppstart uke 2 (7. og 8. januar)</span>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <span>Varighet 23 kursdager</span>
                </div>
                <p className="text-sm text-slate-400">
                  <span className="text-cyan-200/80">Merk:</span> Ingen kurs i vinterferien (uke 8), påsken eller andre helligdager.
                </p>
              </div>
            </div>
          )}
        </div>
        {!isModal && (
          <p className="text-xs text-txt-muted italic mt-4">
            * Tidene markert med stjerne er organisert gjennom Asker Triathlonklubb
          </p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Sticky Mobile Nav (Default) */}
          {!isModal && (
              <div className="lg:hidden col-span-1 sticky top-16 md:top-20 z-30 bg-slate-950/95 backdrop-blur-md py-4 -mx-4 px-4 border-b border-white/5 flex gap-3 overflow-x-auto no-scrollbar">
                 {SCHEDULE_DATA.map((dayData, index) => (
                    <button
                       key={index}
                       onClick={() => {
                            const el = document.getElementById(`schedule-day-${dayData.day}-def`);
                            const offset = 140;
                            if(el) {
                                const bodyRect = document.body.getBoundingClientRect().top;
                                const elementRect = el.getBoundingClientRect().top;
                                const elementPosition = elementRect - bodyRect;
                                const offsetPosition = elementPosition - offset;
                                window.scrollTo({
                                    top: offsetPosition,
                                    behavior: "smooth"
                                });
                            }
                       }}
                       className="flex-shrink-0 px-4 py-2 bg-slate-800/50 border border-white/10 text-cyan-400 font-bold text-sm rounded-lg whitespace-nowrap hover:bg-slate-800 active:scale-95 transition-all"
                    >
                       Gå til {dayData.day}
                    </button>
                 ))}
              </div>
          )}

          {SCHEDULE_DATA.map((dayData, index) => (
            <div key={index} id={`schedule-day-${dayData.day}-def`} className="bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-white/10 transition-colors scroll-mt-32">
              <div className="sticky top-[118px] md:top-[135px] z-20 flex flex-col items-start mb-8 -mt-6 -mx-6 px-6 sm:-mt-8 sm:-mx-8 sm:px-8 py-6 bg-slate-900/95 backdrop-blur-md rounded-t-2xl border-b border-white/5 shadow-lg">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                      <Calendar size={20} />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-baseline gap-3 flex-wrap">
                             <h3 className="text-2xl font-bold text-white mb-0 leading-none">{dayData.day}</h3>
                             <p className="text-cyan-200 font-medium text-sm leading-none">{dayData.startDate}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5">
                             <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">23 kursdager</p>
                             <div className="h-0.5 w-0.5 bg-slate-600 rounded-full"></div>
                             <div className="text-[10px] text-cyan-400 font-medium tracking-wide">
                              Risenga svømmehall
                            </div>
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
                        onClick={() => handleSessionClick(session, dayData.day)}
                        className={`w-full group relative overflow-hidden rounded-lg border transition-all duration-200 min-h-[5.5rem] ${session.serviceId
                          ? 'bg-tertiary/20 border-white/5 hover:bg-tertiary/40 hover:border-accent/20 hover:shadow-sm cursor-pointer'
                          : 'bg-transparent border-transparent cursor-default opacity-70'
                          }`}
                      >
                        <div className="py-3 px-3 sm:px-4 flex flex-row items-center gap-2 sm:gap-3 h-full">
                          {/* Time - Left Column - Always fixed width */}
                          <div className="flex flex-col items-start gap-0.5 sm:gap-2 min-w-[65px] sm:min-w-[90px] shrink-0 self-start sm:self-center">
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

                          {/* Wrapper for Content and Spots - Stack on mobile, Row on Desktop */}
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 min-w-0 border-l border-white/5 pl-3 sm:pl-4">
                            
                            {/* Middle Column - Content (Left Aligned) */}
                            <div className="flex-1 min-w-0 flex flex-col items-start justify-center">
                              <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors text-sm sm:text-base text-left leading-tight truncate w-full">
                                {session.level}
                              </h4>
                              <p className="text-slate-500 text-xs mt-1 group-hover:text-slate-300 text-left leading-tight w-full">
                                {session.ageGroup}
                              </p>
                            </div>

                            {/* Right Column - Spots & Action */}
                            <div className="flex flex-col items-end justify-center min-w-[80px] shrink-0 self-stretch border-l border-white/5 pl-3 sm:pl-4">
                               <div className="flex items-center gap-2 mb-1">
                                {!!session.serviceId && (
                                  <span className="text-[10px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                                    VELG
                                  </span>
                                )}
                                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors shrink-0 ${session.serviceId
                                  ? 'bg-tertiary group-hover:bg-accent/20'
                                  : 'bg-white/5'
                                  }`}>
                                  <ChevronRight className={`w-3 h-3 transition-colors ${session.serviceId
                                    ? 'text-txt-muted group-hover:text-accent'
                                    : 'text-white/10'
                                    }`} />
                                </div>
                              </div>
                              {session.spots && (
                                <div className={`flex flex-col items-end justify-center text-[9px] px-2 py-0.5 text-center rounded leading-tight ${getSpotTextStyle(session.spots)}`}>
                                  {typeof session.spots === 'string' && session.spots.includes('(') ? (
                                    <>
                                      <span className="font-bold">{formatSpotText(session.spots).split(' (')[0]}</span>
                                      <span className="opacity-90 whitespace-nowrap">({formatSpotText(session.spots).split(' (')[1]}</span>
                                    </>
                                  ) : (
                                    <span>{formatSpotText(session.spots)}</span>
                                  )}
                                </div>
                              )}
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