import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCHEDULE_DATA } from '../constants';
import { Calendar, ChevronRight, Clock, Users, ArrowRight } from 'lucide-react';
import { CourseSession, DayOfWeek } from '../types';
import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';
import NordicSessionCard from './NordicSessionCard';
import SeaCreature from './SeaCreature';

interface ScheduleProps {
  onSelectCourse: (course: string, serviceId?: string) => void;
  isModal?: boolean;
  courseTitle?: string;
  theme?: Theme;
  targetServiceId?: string | null;
  stickyTopOffset?: number;
}

const Schedule: React.FC<ScheduleProps> = ({ onSelectCourse, isModal = false, courseTitle, theme, targetServiceId, stickyTopOffset = 0 }) => {
  const navigate = useNavigate();

  const handleSessionClick = React.useCallback((session: CourseSession, day: string) => {
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
  }, [onSelectCourse]);

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
  const [headerBottomPos, setHeaderBottomPos] = React.useState(230); // Default fallback
  const [desktopHeaderHeight, setDesktopHeaderHeight] = React.useState(160); // Default fallback desktop
  const headerRef = React.useRef<HTMLDivElement>(null);
  const desktopHeaderRef = React.useRef<HTMLDivElement>(null);

  // Measure Mobile Sticky Header Height
  React.useEffect(() => {
    // Only run if we are in a relevant mode
    if (theme === 'luxury' || (theme === 'nordic' && isModal)) return;

    const updateHeight = () => {
        if (headerRef.current) {
            // The sticky header starts at top: 80px (due to navbar).
            // So the bottom of this header (where the next element should stick) is 80 + height.
            // We subtract 2px to ensure a TIGHT fit (no gaps).
            const height = headerRef.current.offsetHeight;
            setHeaderBottomPos(80 + height - 2); 
        }
        if (desktopHeaderRef.current) {
             setDesktopHeaderHeight(desktopHeaderRef.current.offsetHeight);
        }
    };

    const observer = new ResizeObserver(updateHeight);
    if (headerRef.current) observer.observe(headerRef.current);
    if (desktopHeaderRef.current) observer.observe(desktopHeaderRef.current);
    
    updateHeight(); // Initial check
    
    window.addEventListener('resize', updateHeight);

    return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateHeight);
    };
  }, [theme, isModal]);

  // Smart Scroll Effect
  React.useEffect(() => {
    if (targetServiceId) {
        // Find the first occurrence of this serviceId
        let foundDayIndex = -1;
        let foundSessionIndex = -1;

        for (let d = 0; d < SCHEDULE_DATA.length; d++) {
            const daySessions = SCHEDULE_DATA[d].sessions;
            for (let s = 0; s < daySessions.length; s++) {
                if (daySessions[s].serviceId === targetServiceId) {
                    foundDayIndex = d;
                    foundSessionIndex = s;
                    break;
                }
            }
            if (foundDayIndex !== -1) break;
        }

        if (foundDayIndex !== -1) {
            // Wait a moment for the parent scroll to finish (scrolling to #schedule)
            setTimeout(() => {
                const targetId = isModal 
                    ? `session-modal-${foundDayIndex}-${foundSessionIndex}`
                    : `session-${foundDayIndex}-${foundSessionIndex}`;
                
                const element = document.getElementById(targetId);
                
                if (element) {
                    // Logic for Modal Scrolling
                    if (isModal) {
                        const container = document.getElementById('schedule-modal-scroll-container');
                        if (container) {
                            const headerOffset = 260; // Larger offset for modal header + sticky nav
                            const elementRect = element.getBoundingClientRect();
                            const currentScroll = container.scrollTop;
                            
                            // Calculate position relative to the container's *current viewport* position
                            // We use .top from viewport, but need to account for container's own offset?
                            // Actually, elementRect.top is viewport Y. 
                            // We need to scroll so that element is at (container.top + headerOffset).
                            // Target Scroll = Current Scroll + (Element Top - Container Top) - Offset??
                            // Simpler: container.scrollTo approx.
                            
                            // Let's use the logic that works in ScheduleModal's Day Selector:
                            const targetTop = elementRect.top; 
                            // Wait, if we use the same calculation as ScheduleModal:
                            // container.scrollTo({ top: currentScroll + targetTop - headerOffset ... }) 
                            // This assumes targetTop is relative to viewport top? Yes.
                            // But container.scrollTop changes where the element is. 
                            // If container is at 0, targetTop is e.g. 500. Scroll to 500.
                            // If container is at 500, targetTop is 0. Scroll to 500 + 0 = 500.
                            // BUT targetTop is relative to VIEWPORT. 
                            
                            // Fix: The logic in ScheduleModal day selector seems to be:
                            // container.scrollTo({ top: currentScroll + elementRect.top - headerOffset })
                            // This actually roughly implicitly handles "scroll relative". 
                            // However, elementRect.top depends on current scroll.
                            // Let's trust that logic but maybe refine the offset.
                            
                            container.scrollTo({
                                top: currentScroll + elementRect.top - headerOffset,
                                behavior: 'smooth'
                            });
                        }
                    } else {
                        // Logic for Window Scrolling (Standard Page)
                        const offset = 220; // Safe margin for headers
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = element.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }

                    // Highlight effect
                    setFocusedSessionId(targetId);
                    setTimeout(() => setFocusedSessionId(null), 2000);
                }
            }, 600); // 600ms delay to allow section scroll to complete
        }
    }
  }, [targetServiceId, isModal]);

  // Scroll Spy for Main Page (Nordic Theme)
  React.useEffect(() => {
    if (theme !== 'nordic' || isModal) return;

    const handleScroll = () => {
        // Trigger Point: The "Read Line" just below the sticky header.
        // Sticky header is dynamic.
        // We want to switch as soon as the next day's header "touches" or slid under this line.
        const headerOffset = headerBottomPos + 5; 
        
        // Find the "current" section by finding the LAST section that has started (top <= offset)
        // This handles overlapping sections correctly.
        let activeSection = SCHEDULE_DATA[0].day; // Default to first

        for (const dayData of SCHEDULE_DATA) {
            const el = document.getElementById(`schedule-day-${dayData.day}`);
            if (el) {
                const rect = el.getBoundingClientRect();
                // If the top of this section is above our "read line", it's a candidate.
                // Since we iterate in order, the *last* one that matches is the one currently "driving".
                if (rect.top <= headerOffset) {
                    activeSection = dayData.day;
                }
            }
        }

        if (activeSection && activeSection !== activeDay) {
            setActiveDay(activeSection);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial check after a short delay to ensure layout is stable
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme, isModal, headerBottomPos]);

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
                    // Try to trigger a subtle haptic feedback
                    if (typeof navigator !== 'undefined' && navigator.vibrate) {
                        try {
                            navigator.vibrate(10); // Very short "tick"
                        } catch (e) {
                            // Ignore if blocked
                        }
                    }
                }
            });
        },
        {
            root: null,
            rootMargin: '-60% 0px -40% 0px', // Visual center below sticky header (approx 60% down screen)
            threshold: 0
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
      <section id="schedule" className="pt-0 pb-8 md:py-24 bg-[#FAFAF9] scroll-mt-32">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            {/* Desktop Sticky Header: "Kurstider" */}
            <div 
                ref={desktopHeaderRef}
                className="hidden lg:block sticky top-[80px] z-30 bg-[#FAFAF9]/95 backdrop-blur-sm shadow-sm border-b border-gray-100 text-center py-6 mb-8 -mx-8"
            >
                <span className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold block mb-2">
                   Januar 2026
                </span>
                <h2 className="text-5xl font-serif text-slate-900 leading-tight">
                   Kurstider
                </h2>
                <div className="w-16 h-[2px] bg-slate-900 mx-auto mt-6 mb-3"/>
                 <p className="text-slate-600 font-medium text-sm uppercase tracking-wide">
                  Risenga Svømmehall • 23 kursdager • Oppstart 7. & 8. Jan
                </p>
            </div>

            {/* Mobile Title (Non-sticky, scrolls away) */}
            <div className="text-center mb-6 space-y-2 md:hidden">
                <span className="text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold">
                   Januar 2026
                </span>
                <h2 className="text-3xl font-serif text-slate-900 leading-tight">
                   Kurstider
                </h2>
            </div>

            {/* UNIFIED STICKY HEADER CONTAINER - NUCLEAR FIX (Solid BG, Zero Gaps) */}
            <div ref={headerRef} className="lg:hidden sticky top-[80px] z-40 bg-[#FAFAF9] shadow-sm border-b border-gray-200 -mx-6 mb-0">
                
                {/* Part 1: Kurstider Title & Location */}
                <div className="px-6 pt-1 pb-0 text-center relative z-20">
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-serif italic text-4xl tracking-tight leading-none mb-0">
                            Kurstider
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 leading-none pb-1">
                            {(() => {
                                const day = SCHEDULE_DATA.find(d => d.day === activeDay) || SCHEDULE_DATA[0];
                                const location = day.day === DayOfWeek.Tuesday ? 'Holmen Svømmehall' : 'Risenga Svømmehall';
                                return `${location} • ${day.durationInfo}`;
                            })()}
                        </span>
                    </div>
                </div>

                {/* Part 2: Filters - MORE AIR */}
                <div className="px-6 py-0 mt-2 pb-2 overflow-x-auto no-scrollbar flex justify-start gap-2 snap-x bg-[#FAFAF9] relative z-10 h-[36px] items-center">
                   {SCHEDULE_DATA.map((dayData, index) => {
                      const isActive = activeDay === dayData.day;
                      return (
                          <button
                             key={index}
                             onClick={() => {
                                const el = document.getElementById(`schedule-day-${dayData.day}`);
                                const offset = headerBottomPos + 5;
                                if(el) {
                                    const bodyRect = document.body.getBoundingClientRect().top;
                                    const elementRect = el.getBoundingClientRect().top;
                                    const elementPosition = elementRect - bodyRect;
                                    const offsetPosition = elementPosition - offset;
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth"
                                    });
                                    setActiveDay(dayData.day);
                                }
                             }}
                             className={`flex-shrink-0 snap-center px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all duration-300 border
                                ${isActive
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                                }`}
                          >
                             {dayData.day}
                          </button>
                      );
                   })}
                </div>

                {/* Part 3: Date Info - RELAXED SPACING */}
                <div className="px-6 pt-0 pb-2 text-center bg-[#FAFAF9] mt-0 relative z-0">
                     <span className="text-[9px] font-medium uppercase tracking-widest text-slate-500 block leading-tight">
                        {(() => {
                            const day = SCHEDULE_DATA.find(d => d.day === activeDay);
                            if (!day) return 'Januar 2026';
                            return day.startDate;
                        })()}
                     </span>
                </div>
            </div>


            {/* Starfish for Enroll Step 1 - Visible on Mobile too */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden z-0">
                 <SeaCreature 
                    type="starfish" 
                    animation="peek-right" 
                    theme="nordic" 
                    className="top-[70px] right-2 lg:top-40 lg:right-10 opacity-90" 
                    delay={0.5} 
                    size="sm"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mt-0 lg:mt-8 relative z-0">

                {SCHEDULE_DATA.map((dayData, index) => (
                    <div key={index} id={`schedule-day-${dayData.day}`} className="space-y-0 lg:space-y-6 pb-0" style={{ scrollMarginTop: headerBottomPos + 5 }}>
                        {/* Day Header - Mobile */}
                        <div className="lg:hidden pb-4 pt-10 px-1 text-center">
                            <h3 className="text-xl font-serif text-slate-900 uppercase tracking-widest border-b border-gray-100 pb-2 inline-block px-8">
                                {dayData.day}
                            </h3>
                        </div>

                        {/* Day Header - Desktop (Sticky Level 2) */}
                        <div 
                            className="hidden lg:block pt-4 pb-2 border-b border-slate-200 sticky z-40 bg-[#FAFAF9] shadow-sm"
                            style={{ top: 80 + desktopHeaderHeight }}
                        >
                            <div className="flex flex-row items-center gap-6 justify-start">
                                <h3 className="text-3xl md:text-3xl font-serif text-slate-900 uppercase">
                                    {dayData.day}
                                </h3>
                                <span className="inline-flex items-center gap-1.5 text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                    <Calendar size={16} className="text-slate-500" />
                                    <span className="font-medium text-sm tracking-wide">
                                        Oppstart {dayData.startDate.replace(/Oppstart /i, '')}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                             {dayData.sessions.map((session, sIndex) => {
                                 const isActive = !!session.serviceId;
                                 const sessionId = `session-${index}-${sIndex}`;
                                 const isFocused = focusedSessionId === sessionId;
                                 
                                 return (
                                    <React.Fragment key={sIndex}>
                                        {session.time === "---" ? (
                                             /* Pool Header - Desktop Sticky (Level 3) & Mobile Sticky */
                                             <div 
                                                className="sticky z-10 py-3 text-center border-b border-light-blue-500/30 bg-[#FAFAF9] shadow-sm -mx-1 px-1"
                                                style={{ 
                                                    top: typeof window !== 'undefined' && window.innerWidth >= 1024 
                                                        ? 80 + desktopHeaderHeight + 58 /* Adjusted for tight fit (Day header approx 58-60px) */
                                                        : headerBottomPos 
                                                }}
                                             >
                                                 <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 flex items-center justify-center gap-2">
                                                     <div className="w-8 h-[1px] bg-slate-300"></div>
                                                     {session.level}
                                                     <div className="w-8 h-[1px] bg-slate-300"></div>
                                                 </span>
                                             </div>
                                        ) : (
                                            <NordicSessionCard 
                                                id={sessionId}
                                                session={session}
                                                day={dayData.day}
                                                isActive={isActive}
                                                isFocused={isFocused}
                                                onClick={handleSessionClick}
                                            />
                                        )}
                                    </React.Fragment>
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

  // NORDIC THEME (Modal Version - Matches Main Page)
  if (theme === 'nordic' && isModal) {
    return (
      <div className="bg-[#FAFAF9] pb-8 relative">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
                {SCHEDULE_DATA.map((dayData, index) => (
                    <div key={index} id={`modal-day-${dayData.day}`} className="space-y-6">
                        
                        {/* Day Header - Sticky Stack Level 1: "ONSDAG - Oppstart ..." */}
                        <div 
                            className="bg-[#FAFAF9] z-30 flex flex-col items-center justify-center border-b border-slate-100 pt-6 pb-3 shadow-sm sticky -mx-4 lg:-mx-8 px-4 lg:px-8"
                            style={{ top: (stickyTopOffset || 0) - 1 }} /* -1px overlap for seal */
                        >
                            <h3 className="text-xl font-serif text-slate-900 uppercase tracking-widest mb-1">
                                {dayData.day}
                            </h3>
                             <span className="inline-flex items-center gap-1.5 text-slate-700 bg-slate-100/50 px-3 py-1 rounded-full border border-slate-200/50">
                                <Calendar size={12} className="text-slate-500" />
                                <span className="font-medium text-xs uppercase tracking-wide">
                                    Oppstart {dayData.startDate.replace(/Oppstart /i, '')}
                                </span>
                            </span>
                        </div>

                        <div className="space-y-4">
                             {dayData.sessions.map((session, sIndex) => {
                                 const isActive = !!session.serviceId;
                                 const sessionId = `session-modal-${index}-${sIndex}`;
                                 const isFocused = focusedSessionId === sessionId;
                                 
                                 if (session.time === "---") {
                                     /* Pool Header - Sticky Stack Level 2 */
                                     return (
                                         <div 
                                            key={sIndex}
                                            className="sticky z-20 py-3 text-center border-b border-light-blue-500/30 bg-[#FAFAF9] shadow-sm -mx-4 lg:-mx-8 px-4 lg:px-8"
                                            style={{ top: (stickyTopOffset || 0) + 85 /* Adjusted for Day Header height (increased padding) */ }} 
                                         >
                                             <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 flex items-center justify-center gap-2">
                                                 <div className="w-8 h-[1px] bg-slate-300"></div>
                                                 {session.level}
                                                 <div className="w-8 h-[1px] bg-slate-300"></div>
                                             </span>
                                         </div>
                                     );
                                 }

                                 return (
                                    <div key={sIndex} id={sessionId} className="snap-center scroll-mt-[250px]">
                                        <NordicSessionCard 
                                            id={sessionId}
                                            session={session}
                                            day={dayData.day}
                                            isActive={isActive}
                                            isFocused={isFocused}
                                            onClick={handleSessionClick}
                                        />
                                    </div>
                                 );
                             })}
                        </div>
                    </div>
                ))}
            </div>
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
                             <h3 className="text-4xl md:text-3xl font-bold text-white mb-0 leading-none">{dayData.day}</h3>
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
                          <div className="flex-col items-start gap-0.5 sm:gap-2 min-w-[65px] sm:min-w-[90px] shrink-0 self-start sm:self-center hidden sm:flex">
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

                             {/* Time - Left Column - Mobile Only */}
                             <div className="flex flex-col items-start gap-0.5 min-w-[65px] shrink-0 self-start sm:hidden">
                            <div className="flex items-center gap-2">
                              <span className="block text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tabular-nums leading-tight">
                                {session.time.split(" - ")[0]}
                              </span>
                            </div>
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