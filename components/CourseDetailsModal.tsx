import React, { useEffect } from 'react';
import { X, MapPin, Clock, Calendar, CheckCircle, Info } from 'lucide-react';
import { SERVICES } from '../constants';

interface CourseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string | null;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({ isOpen, onClose, serviceId }) => {
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

    if (!isOpen || !serviceId) return null;

    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return null;

    const { details } = service;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/10 flex flex-col h-[85vh] sm:h-auto sm:max-h-[90vh] animate-fade-in-up overflow-hidden">

                {/* Header Image */}
                <div className="relative h-40 sm:h-64 w-full shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
                    <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors z-20 border border-white/10"
                    >
                        <X size={24} />
                    </button>
                    <div className="absolute bottom-6 left-6 z-20">
                        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">{service.title}</h2>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-bold uppercase tracking-wider">
                                {details.age}
                            </span>
                            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                <Clock size={12} /> {details.duration}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="prose prose-invert max-w-none">
                                <div className="whitespace-pre-line text-slate-300 leading-relaxed text-lg">
                                    {details.fullDescription}
                                </div>
                            </div>

                            {/* Learning Goals */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="text-green-400" size={20} />
                                    Hva lærer vi?
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {details.learningGoals.map((goal, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-white/5">
                                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                            {goal}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-cyan-400 shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Sted</h4>
                                        <p className="text-white">{details.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="text-cyan-400 shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Pris</h4>
                                        <p className="text-white text-lg font-bold">{details.price}</p>
                                    </div>
                                </div>

                                {details.parentalInvolvement && (
                                    <div className="flex items-start gap-3">
                                        <Info className="text-cyan-400 shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Foreldre</h4>
                                            <p className="text-white">{details.parentalInvolvement}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Ta med</h4>
                                <ul className="space-y-2">
                                    {details.whatToBring.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50 rounded-b-none sm:rounded-b-3xl flex justify-end shrink-0 pb-8 sm:pb-6">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-lg shadow-cyan-900/20 hover:scale-105"
                    >
                        Lukk og fortsett
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CourseDetailsModal;
