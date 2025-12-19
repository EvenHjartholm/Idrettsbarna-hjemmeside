import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar } from 'lucide-react';
import Schedule from './Schedule';
import { Theme } from '../types';

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
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
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
                    <div className={`p-6 md:p-8 border-b flex flex-col items-center justify-center backdrop-blur-md sticky top-0 z-20 rounded-t-2xl ${
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

                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${
                            isNordic 
                                ? 'bg-white border-slate-100 shadow-sm' 
                                : 'bg-slate-800 border-slate-700'
                        }`}>
                            <Calendar size={32} className={isNordic ? 'text-slate-900' : 'text-cyan-400'} />
                        </div>

                        <h2 className={`text-2xl md:text-3xl font-extrabold text-center mb-2 ${
                            isNordic ? 'text-slate-900 font-serif' : 'text-white font-serif'
                        }`}>
                            Kurstider Januar 2026
                        </h2>
                        <p className={`text-sm md:text-base text-center max-w-lg mx-auto leading-relaxed ${
                            isNordic ? 'text-slate-500 font-light' : 'text-slate-400 font-light'
                        }`}>
                            Oppstart uke 2 (7. og 8. januar). Varighet 23 kursdager.
                        </p>
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
