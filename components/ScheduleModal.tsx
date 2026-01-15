import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar } from 'lucide-react';
import Schedule from './Schedule';
import { Theme } from '../types';
import { SCHEDULE_DATA } from '../constants';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCourse: (courseName: string, serviceId?: string) => void;
    courseTitle: string;
    theme?: Theme;
    targetServiceId?: string | null;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSelectCourse, courseTitle, theme = 'nordic', targetServiceId }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Use theme prop from parent
    const isNordic = theme === 'nordic';
    const [activeDay, setActiveDay] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!isOpen) return;
        
        const container = document.getElementById('schedule-modal-scroll-container');
        if (!container) return;

        const handleScroll = () => {
            const triggerPoint = 250; // Use a fixed point, roughly below the sticky headers
            
            // Find the day section that is currently crossing the trigger point
            let activeSection = null;

            for (const dayData of SCHEDULE_DATA) {
                const el = document.getElementById(`modal-day-${dayData.day}`);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // We want the section that 'contains' the trigger point
                    // rect.top <= triggerPoint AND rect.bottom > triggerPoint
                    if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
                        activeSection = dayData.day;
                        break;
                    }
                }
            }

            // Fallback: If nothing crosses the line (e.g. at the very bottom), stick to the last one
            // Also check for very top
            if (container.scrollTop < 50) {
                 const firstDay = SCHEDULE_DATA[0];
                 activeSection = firstDay.day;
            } else if (!activeSection) {
                 const lastDay = SCHEDULE_DATA[SCHEDULE_DATA.length - 1];
                 const lastEl = document.getElementById(`modal-day-${lastDay.day}`);
                 if (lastEl && lastEl.getBoundingClientRect().top < triggerPoint) {
                     activeSection = lastDay.day;
                 }
            }
            
            if (activeSection !== activeDay) {
                setActiveDay(activeSection);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
        
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isOpen, activeDay]);






    if (!isOpen) return null;

    return createPortal(
        <div id="schedule-modal-scroll-container" className="fixed inset-0 z-50 overflow-y-auto animate-fade-in snap-y snap-mandatory scroll-smooth scroll-pt-[250px]">
            {/* Container to center content but allow scrolling */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 backdrop-blur-sm transition-opacity ${
                        isNordic ? 'bg-slate-200/60' : 'bg-slate-950/90'
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                ></div>

                {/* Modal Content */}
                <div className={`relative w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col animate-scale-up z-10 ${
                    isNordic ? 'bg-[#FAFAF9] border border-slate-200 shadow-slate-200/50' : 'bg-slate-900 border border-white/10'
                }`}>
                    {/* Close Button - Moved out of sticky header for z-index safety */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        type="button"
                        className={`absolute top-4 right-4 p-3 rounded-full z-50 transition-colors ${
                            isNordic 
                                ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' 
                                : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                        aria-label="Lukk"
                    >
                        <X size={28} />
                    </button>

                    {/* Header - Sticky */}
                    {/* Header - Icon (Scrolls away) */}
                    <div className={`pt-6 pb-2 flex flex-col items-center justify-center rounded-t-2xl ${
                        isNordic 
                            ? 'bg-[#FAFAF9]' 
                            : 'bg-slate-900'
                    }`}>
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            isNordic 
                                ? 'bg-white border-slate-100 shadow-sm' 
                                : 'bg-slate-800 border-slate-700'
                        }`}>
                            <Calendar size={20} className={isNordic ? 'text-slate-900' : 'text-cyan-400'} />
                        </div>
                    </div>

                    {/* Header - Sticky Title & Nav */}
                    <div className={`pb-3 pt-1 px-6 border-b flex flex-col items-center justify-center backdrop-blur-md sticky top-0 z-40 ${
                        isNordic 
                            ? 'bg-[#FAFAF9]/95 border-slate-100' 
                            : 'bg-slate-900/95 border-white/5'
                    }`}>


                        <h2 className={`text-2xl md:text-3xl font-serif text-center mb-1 ${
                            isNordic ? 'text-slate-900' : 'text-white'
                        }`}>
                            Kurstider
                        </h2>
                        <div className={`w-12 h-[2px] mx-auto mt-2 mb-2 ${isNordic ? 'bg-slate-900' : 'bg-white/20'}`}/>
                        
                        <p className={`text-[10px] md:text-xs text-center uppercase tracking-wide font-bold ${
                            isNordic ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                            Risenga • 23 Kursdager • Oppstart 7. & 8. Jan
                        </p>

                        {/* Trinn 1: Velg Kursdag */}
                        <div className="w-full mt-3 flex flex-col gap-1 border-t border-slate-100 pt-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-900 uppercase justify-center mb-0.5">
                                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] ${isNordic ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>1</span>
                                VELG KURS
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar justify-center pb-1">
                                {SCHEDULE_DATA.map((dayData, index) => {
                                   const isActive = activeDay === dayData.day;
                                   return (
                                       <button
                                          key={index}
                                          onClick={() => {
                                             const container = document.getElementById('schedule-modal-scroll-container');
                                             const el = document.getElementById(`modal-day-${dayData.day}`);
                                             const headerOffset = 210; 
                                             if(container && el) {
                                                const elementRect = el.getBoundingClientRect();
                                                const currentScroll = container.scrollTop;
                                                const targetTop = elementRect.top; 
                                                container.scrollTo({
                                                    top: currentScroll + targetTop - headerOffset,
                                                    behavior: 'smooth'
                                                });
                                                // Optimistic update
                                                setActiveDay(dayData.day);
                                             }
                                          }}
                                          className={`flex-shrink-0 px-4 py-2 border font-serif text-sm rounded-full transition-all duration-200 whitespace-nowrap ${
                                              isActive 
                                                ? 'bg-white text-slate-900 border-2 border-slate-900 font-medium z-10' 
                                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                          }`}
                                       >
                                          {dayData.day}
                                       </button>
                                   );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Schedule Content */}
                    <div className={`p-0 rounded-b-2xl ${
                        isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950'
                    }`}>
                        <Schedule
                            isModal={true}
                            onSelectCourse={onSelectCourse}
                            courseTitle={courseTitle}
                            theme={theme} 
                            targetServiceId={targetServiceId}
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ScheduleModal;
