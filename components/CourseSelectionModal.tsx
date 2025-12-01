import React, { useEffect } from 'react';
import { X, Clock, Calendar, CheckCircle, ArrowRight, Info, MapPin } from 'lucide-react';
import { ServiceItem } from '../types';

interface CourseSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseData: {
        level: string;
        day: string;
        time: string;
        ageGroup?: string; // Added optional ageGroup to pass through if available
    } | null;
    serviceData: ServiceItem | undefined;
    onConfirm: () => void;
}

const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({ isOpen, onClose, courseData, serviceData, onConfirm }) => {
    // Prevent body scroll when modal is open
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

    if (!isOpen || !courseData || !serviceData) return null;

    // Helper to clean markdown bold syntax
    const cleanText = (text: string) => text.replace(/\*\*/g, '');

    // Helper to get start date based on day
    const getStartDate = (day: string) => {
        if (day.toLowerCase().includes('onsdag')) return '7. jan';
        if (day.toLowerCase().includes('torsdag')) return '8. jan';
        return 'Januar';
    };

    // Construct full title: "Level: AgeGroup"
    // If ageGroup is not passed in courseData, we might need to rely on serviceData or just show level
    // However, looking at Schedule.tsx, courseData usually comes from the clicked session.
    // Let's assume courseData might need to be enriched or we use what we have.
    // In Schedule.tsx, handleCourseClick passes { level: session.level, day: day.day, time: session.time }
    // It doesn't pass ageGroup currently. 
    // BUT, the user wants "Småbarnsvømming: 2 - 3 år".
    // "Småbarnsvømming" is the level. "2 - 3 år" is the ageGroup.
    // I should probably update Schedule.tsx to pass ageGroup, OR I can try to find it here if I had the session ID.
    // But wait, the modal props definition in this file says `courseData` has level, day, time.
    // I will update the component to accept ageGroup if passed, and fallback gracefully.
    // For now, I'll use courseData.level. If I need ageGroup, I'll need to update the caller (Schedule.tsx) in a separate step.
    // Actually, I can try to match the session from SCHEDULE_DATA if I really need to, but passing it is better.
    // Let's assume for this step I will just use what I have, and if "2-3 år" is missing, I'll add a task to update Schedule.tsx.

    // Wait, looking at the previous file content of CourseSelectionModal.tsx, it didn't use ageGroup.
    // The user image shows "Småbarnsvømming: 2 - 3 år".
    // I will assume I need to update Schedule.tsx to pass this info. 
    // For now, I will code this component to DISPLAY it if it exists.

    const fullTitle = courseData.ageGroup
        ? `${courseData.level}: ${courseData.ageGroup}`
        : courseData.level;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh] animate-fade-in-up overflow-hidden">

                {/* Header Image */}
                <div className="relative h-48 sm:h-64 w-full shrink-0">
                    <img
                        src={serviceData.imageUrl}
                        alt={serviceData.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for text readability if needed, but we have text below now */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors z-20 border border-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Header Content (Below Image) */}
                <div className="px-6 pt-6 pb-4 bg-slate-900">
                    <h2 className="text-2xl font-bold text-white leading-tight mb-2">{fullTitle}</h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <MapPin size={16} className="text-cyan-500" />
                        {serviceData.details.location.split(',')[0]}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 space-y-6">

                    {/* Info Grid (DAG & TID) */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* DAG Box */}
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                <Calendar size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Dag</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg capitalize">{courseData.day}</p>
                                <p className="text-sm text-slate-400 mt-1">Oppstart {getStartDate(courseData.day)}</p>
                            </div>
                        </div>

                        {/* TID Box */}
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                            <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                <Clock size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">Tid</span>
                            </div>
                            <div>
                                <p className="text-white font-bold text-lg">{courseData.time}</p>
                                <p className="text-sm text-slate-400 mt-1">{serviceData.details.duration}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price Info Box */}
                    <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Pris</h3>
                                <p className="text-2xl font-bold text-cyan-400">{serviceData.details.price}</p>
                            </div>
                            <div className="text-right mt-1">
                                <span className="inline-block bg-white/5 px-3 py-1 rounded-lg text-xs text-slate-300 font-medium">
                                    ca. kr 185,- per gang
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-white/5">
                            <div className="flex gap-3 text-sm text-slate-400">
                                <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                <p>Inngang til Risenga svømmehall kommer i tillegg.</p>
                            </div>
                            <div className="flex gap-3 text-sm text-slate-400">
                                <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                <p>Det er fullt mulig å dele opp fakturaen, bare gi oss beskjed.</p>
                            </div>
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="text-slate-300 text-sm leading-relaxed">
                        <p>{cleanText(serviceData.description)}</p>
                    </div>

                </div>

                {/* Sticky Footer Action */}
                <div className="p-6 border-t border-white/10 bg-slate-900 shrink-0">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        Meld på kurset <ArrowRight size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CourseSelectionModal;
