import React from 'react';
import { X } from 'lucide-react';
import Schedule from './Schedule';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEnroll?: (courseName: string, serviceId?: string) => void;
    onSelectCourse: (courseName: string, serviceId?: string) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, onEnroll, onSelectCourse }) => {
    if (!isOpen) return null;

    const handleEnroll = (courseName: string, serviceId?: string) => {
        if (onEnroll) onEnroll(courseName, serviceId);
        onSelectCourse(courseName, serviceId);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] animate-fade-in-up overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                    <h2 className="text-xl font-bold text-white">Velg kurs</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Schedule onEnroll={handleEnroll} isModal={true} onSelectCourse={onSelectCourse} />
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-md flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                        Lukk
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;
