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
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSelectCourse, courseTitle, theme }) => {
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

    if (!isOpen) return null;

    // Use theme prop from parent
    const isNordic = theme === 'nordic';

    return createPortal(
        <div id="schedule-modal-scroll-container" className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
            {/* Container to center content but allow scrolling */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className={`fixed inset-0 backdrop-blur-sm transition-opacity ${
                        isNordic ? 'bg-slate-200/60' : 'bg-slate-950/90'
                    }`}
                    onClick={onClose}
                ></div>

                {/* Modal Content */}
                <div className={`relative w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col animate-scale-up z-10 ${
                    isNordic ? 'bg-[#FAFAF9] border border-slate-200 shadow-slate-200/50' : 'bg-slate-900 border border-white/10'
                }`}>

                    {/* Header - Sticky */}
                    {/* Header - Icon (Scrolls away) */}
                    <div className={`pt-8 pb-2 flex flex-col items-center justify-center rounded-t-2xl ${
                        isNordic 
                            ? 'bg-[#FAFAF9]' 
                            : 'bg-slate-900'
                    }`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                            isNordic 
                                ? 'bg-white border-slate-100 shadow-sm' 
                                : 'bg-slate-800 border-slate-700'
                        }`}>
                            <Calendar size={24} className={isNordic ? 'text-slate-900' : 'text-cyan-400'} />
                        </div>
                    </div>

                    {/* Header - Sticky Title & Nav */}
                    <div className={`pb-4 pt-2 px-6 border-b flex flex-col items-center justify-center backdrop-blur-md sticky top-0 z-40 ${
                        isNordic 
                            ? 'bg-[#FAFAF9]/95 border-slate-100' 
                            : 'bg-slate-900/95 border-white/5'
                    }`}>
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 transition-colors p-2 rounded-full ${
                                isNordic 
                                    ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                            }`}
                        >
                            <X size={24} />
                        </button>

                        <h2 className={`text-xl md:text-2xl font-extrabold text-center mb-1 ${
                            isNordic ? 'text-slate-900 font-serif' : 'text-white font-serif'
                        }`}>
                            Kurstider Januar 2026
                        </h2>
                        <p className={`text-xs md:text-sm text-center max-w-lg mx-auto leading-relaxed ${
                            isNordic ? 'text-slate-500 font-light' : 'text-slate-400 font-light'
                        }`}>
                            Oppstart uke 2 (7. og 8. januar). Varighet 23 kursdager.
                        </p>

                        {/* Trinn 1: Velg Kursdag */}
                        <div className="w-full mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3">
                            <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-slate-400 uppercase justify-center">
                                <span className="bg-slate-900 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px]">1</span>
                                TRINN 1: VELG KURSDAG
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar justify-center pb-1">
                                {SCHEDULE_DATA.map((dayData, index) => (
                                   <button
                                      key={index}
                                      onClick={() => {
                                         const container = document.getElementById('schedule-modal-scroll-container');
                                         const el = document.getElementById(`modal-day-${dayData.day}`);
                                         const headerOffset = 210; // Adjusted for taller header with Trinn 1
                                         if(container && el) {
                                            const elementRect = el.getBoundingClientRect();
                                            const currentScroll = container.scrollTop;
                                            const targetTop = elementRect.top; 
                                            // Goal: Scroll so that element top is at headerOffset
                                            // currentScroll + (targetTop - headerOffset)
                                            container.scrollTo({
                                                top: currentScroll + targetTop - headerOffset,
                                                behavior: 'smooth'
                                            });
                                         }
                                      }}
                                      className="flex-shrink-0 px-3 py-1.5 border border-slate-200 text-slate-700 font-serif text-xs rounded-full bg-white hover:bg-slate-50 transition-colors whitespace-nowrap"
                                   >
                                      {dayData.day}
                                   </button>
                                ))}
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
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ScheduleModal;
