import React, { useEffect } from 'react';
import { X, Clock, Calendar, CheckCircle, ArrowRight, Info, MapPin } from 'lucide-react';
import { ServiceItem } from '../constants';

interface CourseSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseData: {
        level: string;
        day: string;
        time: string;
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

    // Helper to clean markdown bold syntax (just in case)
    const cleanText = (text: string) => text.replace(/\*\*/g, '');

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
                <div className="relative h-64 w-full shrink-0">
                    <img
                        src={serviceData.imageUrl}
                        alt={serviceData.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors z-20 border border-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Header Content (Below Image) */}
                <div className="px-6 pt-6 pb-2 bg-slate-900">
                    <h2 className="text-2xl font-bold text-white leading-tight mb-2">{courseData.level}</h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <MapPin size={14} className="text-cyan-500" />
                        {serviceData.details.location.split(',')[0]}
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pt-2">

                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-cyan-400 mb-1">
                                <Calendar size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Dag</span>
                            </div>
                            <p className="text-white font-medium">{courseData.day}</p>
                            <p className="text-xs text-slate-400 mt-1">Oppstart 7./8. jan</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-cyan-400 mb-1">
                                <Clock size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Tid</span>
                            </div>
                            <p className="text-white font-medium">{courseData.time}</p>
                            <p className="text-xs text-slate-400 mt-1">{serviceData.details.duration}</p>
                        </div>
                    </div>

                    {/* Price Info */}
                    <div className="bg-slate-800/30 p-5 rounded-xl border border-white/5 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold">Pris</h3>
                                <p className="text-2xl font-bold text-cyan-400">{serviceData.details.price}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block bg-white/5 px-2 py-1 rounded text-xs text-slate-300">
                                    ca. kr 185,- per gang
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-white/5">
                            <div className="flex gap-2 text-sm text-slate-400">
                                <Info size={16} className="shrink-0 text-slate-500 mt-0.5" />
                                <p>Inngang til Risenga svømmehall kommer i tillegg.</p>
                            </div>
                            <div className="flex gap-2 text-sm text-slate-400">
                                <Info size={16} className="shrink-0 text-slate-500 mt-0.5" />
                                <p>Det er fullt mulig å dele opp fakturaen, bare gi oss beskjed.</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                        <p>{cleanText(serviceData.description)}</p>
                    </div>

                </div>

                {/* Sticky Footer Action */}
                <div className="p-6 border-t border-white/10 bg-slate-900 shrink-0">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-cyan-900/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg"
                    >
                        Gå til påmeldingsskjema <ArrowRight size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CourseSelectionModal;
