import React, { useEffect } from 'react';
import { X, MapPin, Clock, Calendar, CheckCircle, Info, MessageCircle } from 'lucide-react';
import { SERVICES, SCHEDULE_DATA } from '../constants';
import { Theme } from '../types';

interface CourseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceId: string | null;
    isFromContactForm?: boolean;
    theme?: Theme; // Kept for compatibility but unused for layout logic
    onEnrollWizard?: () => void;
    onScrollToSchedule?: () => void;
    selectedCourseName?: string;
    onOpenContact?: () => void;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
    isOpen,
    onClose,
    serviceId,
    isFromContactForm = false,
    onEnrollWizard,
    onScrollToSchedule,
    selectedCourseName,
    onOpenContact
}) => {
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

    // Helper to render description with better typography
    const renderDescription = (text: string) => {
        return text.split('\n').map((line, index) => {
            // Check for headers (lines starting with **)
            if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                const headerText = line.trim().replace(/\*\*/g, '');
                return (
                    <h3 key={index} className="text-xl font-bold text-white mt-8 mb-4 first:mt-0">
                        {headerText}
                    </h3>
                );
            }
            // Check for list items
            if (line.trim().startsWith('•')) {
                return (
                    <div key={index} className="flex items-start gap-3 mb-2 ml-1">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 shrink-0"></div>
                        <p className="text-slate-300 leading-relaxed flex-1">{line.replace('•', '').trim()}</p>
                    </div>
                );
            }
            // Regular paragraphs
            if (line.trim() === '') {
                return <div key={index} className="h-2"></div>;
            }

            // Check for bold text within lines
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <p key={index} className="text-slate-300 leading-relaxed mb-4">
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="text-white font-bold">{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                    })}
                </p>
            );
        });
    };

    const handleEnrollClick = () => {
        // Special handling for "Livredningsprøve" and "Barnehagesvømming"
        // These should open the contact form directly
        if (serviceId === 'lifesaving' || serviceId === 'preschool') {
            if (onOpenContact) {
                onClose(); // Close modal first
                // Small timeout to ensure modal is closed before opening contact modal
                setTimeout(() => {
                    onOpenContact();
                }, 100);
            }
            return;
        }

        // For standard courses, scroll to schedule to pick a time
        if (onScrollToSchedule) {
            onScrollToSchedule();
        } else if (onEnrollWizard) {
            onEnrollWizard();
        } else {
            onClose();
        }
    };

    // Parse selectedCourseName if available to extract specific day/time
    let courseName = service.title;
    let courseLevel = details.age;
    let courseDay = '';
    let courseTime = '';
    let availableSpots: number | string | undefined = undefined;

    if (selectedCourseName) {
        const match = selectedCourseName.match(/^(.+?): (.+?) \((.+?) (.+?)\)$/);
        if (match) {
            courseName = match[1];
            courseLevel = match[2];
            courseDay = match[3];
            courseTime = match[4];
        } else {
            // Fallback
            const simpleMatch = selectedCourseName.match(/\((.+?) (.+?)\)$/);
            if (simpleMatch) {
                courseDay = simpleMatch[1];
                courseTime = simpleMatch[2];
            }
        }

        // Find spots from SCHEDULE_DATA
        if (courseDay && courseTime) {
            const scheduleDay = SCHEDULE_DATA.find(d =>
                d.day.toLowerCase().includes(courseDay.toLowerCase()) ||
                courseDay.toLowerCase().includes(d.day.toLowerCase())
            );

            if (scheduleDay) {
                const targetTime = courseTime.replace(/\s/g, '');
                const session = scheduleDay.sessions.find(s =>
                    s.time.replace(/\s/g, '') === targetTime &&
                    s.serviceId === serviceId
                );

                if (session) {
                    availableSpots = session.spots;
                }
            }
        }
    }

    const getStartDate = (day: string) => {
        if (day.includes('Onsdag')) return '7. januar 2026';
        if (day.includes('Torsdag')) return '8. januar 2026';
        return 'Januar 2026';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full h-full md:h-auto md:max-h-[90vh] max-w-2xl bg-slate-900 md:rounded-2xl shadow-2xl border-x md:border border-white/10 flex flex-col overflow-hidden animate-scale-up">

                {/* Header Image */}
                <div className="relative h-48 sm:h-64 w-full shrink-0">
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
                </div>

                {/* Fixed Header Content */}
                <div className="px-6 pt-6 pb-4 bg-slate-900 shrink-0 relative">
                    {/* Spots Badge (Absolute Top Right of Header Content) */}
                    {availableSpots !== undefined && (
                        <div className="absolute top-6 right-6">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${availableSpots === 'Venteliste' || availableSpots === 0 ? 'bg-red-500/20 text-red-400' :
                                availableSpots === 'Få ledige' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-green-500/20 text-green-400'
                                }`}>
                                {typeof availableSpots === 'number'
                                    ? (availableSpots === 1 ? '1 plass ledig' : `${availableSpots} plasser ledige`)
                                    : availableSpots}
                            </span>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-white leading-tight mb-2 pr-24">{courseName}</h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <MapPin size={16} className="text-cyan-500" />
                        {details.location.split(',')[0]}
                    </div>
                </div>


                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 space-y-6">

                    {/* Info Grid (DAG & TID) */}
                    {selectedCourseName && (
                        <div className="grid grid-cols-2 gap-4">
                            {/* DAG Box */}
                            {courseDay && (
                                <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between group hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                        <Calendar size={18} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Dag</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg capitalize">{courseDay}</p>
                                        <p className="text-slate-400 text-sm mt-0.5">Oppstart {getStartDate(courseDay)}</p>
                                    </div>
                                </div>
                            )}

                            {/* TID Box */}
                            {courseTime && (
                                <div className="bg-slate-800/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-between group hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                        <Clock size={18} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Tid</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-lg">{courseTime}</p>
                                        <p className="text-slate-400 text-sm mt-0.5">{details.duration}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Price Info Box */}
                    <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Pris</h3>
                                <p className="text-2xl font-bold text-cyan-400">{details.price}</p>
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
                            <div className="flex gap-3 text-sm text-cyan-300 font-medium">
                                <Info size={18} className="shrink-0 text-cyan-400 mt-0.5" />
                                <p>Det er fullt mulig å dele opp fakturaen, bare gi oss beskjed.</p>
                            </div>
                            {(courseName.toLowerCase().includes('baby') || service.title.toLowerCase().includes('baby')) && (
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                    <p>Om kurslengden er for lang pga permisjon, gi oss beskjed hvor lenge dere har mulighet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <div className="text-slate-300 leading-relaxed text-lg">
                            {renderDescription(details.fullDescription)}
                        </div>
                    </div>

                    {/* Learning Goals */}
                    <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={20} />
                            Hva lærer vi?
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {details.learningGoals.map((goal, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-white/5">
                                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                    {goal}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info (Stacked) */}
                    <div className="space-y-6">
                        {details.parentalInvolvement && (
                            <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                                <div className="flex items-start gap-3">
                                    <Info className="text-cyan-400 shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Foreldre</h4>
                                        <p className="text-white">{details.parentalInvolvement}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
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

                {/* Sticky Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900 shrink-0">
                    {/* Enroll Button - Force Update */}
                    <button
                        onClick={handleEnrollClick}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-900/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
                    >
                        {isFromContactForm
                            ? 'Tilbake til skjema'
                            : (serviceId === 'lifesaving' || serviceId === 'preschool' ? 'Ta kontakt' : (
                                <div className="flex flex-col items-center leading-tight">
                                    <span>Meld på kurset</span>
                                    <span className="text-[10px] font-normal opacity-80 lowercase">Videre til kurstidene</span>
                                </div>
                            ))
                        }
                    </button>
                </div>

            </div >
        </div >
    );
};

export default CourseDetailsModal;
