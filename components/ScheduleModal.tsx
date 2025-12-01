import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar } from 'lucide-react';
import Schedule from './Schedule';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCourse: (courseName: string, serviceId?: string) => void;
    courseTitle: string;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onSelectCourse, courseTitle }) => {
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

    return createPortal(
        <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
            {/* Container to center content but allow scrolling */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal Content */}
                <div className="relative w-full max-w-6xl bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col animate-scale-up z-10">

                    {/* Header - Sticky */}
                    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md sticky top-0 z-20 rounded-t-2xl">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/20">
                            <Calendar size={32} className="text-cyan-400" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-center mb-2">
                            Kurstider Januar 2026
                        </h2>
                        <p className="text-cyan-400 text-sm md:text-base text-center max-w-lg mx-auto leading-relaxed">
                            Oppstart uke 2 (7. og 8. januar). Varighet 23 kursdager.
                        </p>
                    </div>

                    {/* Schedule Content */}
                    <div className="p-0 bg-slate-950/50 rounded-b-2xl">
                        <Schedule
                            isModal={true}
                            onEnroll={() => { }} // Not used in this context as we use onSelectCourse
                            onSelectCourse={onSelectCourse}
                            courseTitle={courseTitle}
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ScheduleModal;
