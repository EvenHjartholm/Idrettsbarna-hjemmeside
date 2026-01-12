import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    childName: string;
    courseName: string;
    inquiryType: string;
    startDate?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, childName, courseName, inquiryType, startDate }) => {
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

    if (!isOpen) return null;

    const isEnrollment = inquiryType === 'Påmelding';

    // Parse course details if available
    let displayCourse = courseName;
    let displayTime = '';
    
    if (isEnrollment && courseName) {
         // Try to match "Name (Day Time)" format
         const match = courseName.match(/^(.+?) \((.+?)\)$/);
         if (match) {
             displayCourse = match[1];
             displayTime = match[2];
         }
    }

    return createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

                {/* Backdrop */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
                </div>

                {/* Modal Content */}
                <div className="relative transform overflow-hidden rounded-3xl bg-[#FAFAF9] text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-100 animate-fade-in-up">

                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors z-10"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 sm:p-10 text-center relative z-10">

                        {/* Animated Success Icon */}
                        <div className="mb-8 relative inline-block">
                             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 relative z-10">
                                {isEnrollment ? (
                                    <CheckCircle className="w-10 h-10 text-slate-900" strokeWidth={1.5} />
                                ) : (
                                    <MessageCircle className="w-10 h-10 text-slate-900" strokeWidth={1.5} />
                                )}
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute inset-0 rounded-full border border-slate-200 scale-125 opacity-50"></div>
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl font-serif text-slate-900 mb-2">
                            Tusen takk!
                        </h2>
                        <p className="text-slate-500 mb-8 font-light">
                             {isEnrollment ? 'Vi har mottatt din påmelding' : 'Din henvendelse er mottatt'}
                        </p>

                        {/* Message Content */}
                        <div className="space-y-6 text-left">
                            
                            {isEnrollment ? (
                                <>
                                    {/* Receipt Card */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
                                        
                                        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4 border-b border-slate-100 pb-2">Kursoversikt</p>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-slate-500">Valgt kurs</p>
                                                <p className="text-lg font-serif text-slate-900 leading-tight">{displayCourse}</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                {displayTime && (
                                                    <div>
                                                        <p className="text-sm text-slate-500 mb-1">Tidspunkt</p>
                                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                                            {displayTime}
                                                        </div>
                                                    </div>
                                                )}
                                                {startDate && (
                                                    <div>
                                                        <p className="text-sm text-slate-500 mb-1">Oppstart</p>
                                                        <div className="flex items-center gap-2 text-slate-900 font-bold">
                                                             <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
                                                            {startDate}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clarification Box */}
                                    <div className="bg-slate-100/50 p-5 rounded-xl border border-slate-200/50">
                                        <div className="flex gap-3">
                                            <div className="w-1 self-stretch bg-slate-300 rounded-full"></div>
                                            <div className="space-y-2">
                                                <p className="text-slate-900 font-medium text-sm">Hva skjer nå?</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    Dette er en søknad om plass. Vi går gjennom listene manuelt og sender deg en <strong>bekreftelse på e-post</strong> så snart vi har funnet plass til {childName || 'dere'}.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-center text-slate-400 italic text-sm pt-2">
                                        Vi gleder oss til å se dere i vannet!
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                                        <p className="text-slate-600 leading-relaxed">
                                            Vi har mottatt din melding og en av våre medarbeidere vil svare deg så raskt som mulig.
                                        </p>
                                    </div>
                                    <p className="text-center text-sm text-slate-400">
                                        Du hører fra oss snart.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={onClose}
                            className="mt-8 w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium tracking-wide rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                        >
                            Lukk vinduet
                        </button>

                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SuccessModal;
