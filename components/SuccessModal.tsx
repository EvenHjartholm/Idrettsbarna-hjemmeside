import React, { useEffect } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    childName: string;
    courseName: string;
    inquiryType: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, childName, courseName, inquiryType }) => {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-green-500/30 flex flex-col animate-fade-in-up overflow-hidden">

                {/* Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-500/10 blur-3xl pointer-events-none"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 text-center relative z-10">

                    {/* Icon */}
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                        {isEnrollment ? (
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        ) : (
                            <MessageCircle className="w-10 h-10 text-green-400" />
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {isEnrollment ? 'Tusen takk for påmeldingen!' : 'Tusen takk for henvendelsen!'}
                    </h2>

                    {/* Message */}
                    <div className="text-slate-300 space-y-4 leading-relaxed">
                        {isEnrollment ? (
                            <>
                                <p>
                                    Vi har registrert påmeldingen på <strong>{courseName || 'kurset'}</strong> for <strong>{childName || 'deltakeren'}</strong>.
                                </p>
                                <p>
                                    Straks vi har fått dere inn i vårt system så får dere en mail på at dere har fått plass.
                                </p>
                                <p className="text-sm text-slate-400 pt-2">
                                    Ta kontakt om det er noen spørsmål.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Tusen takk for henvendelsen.
                                </p>
                                <p>
                                    Du vil få en mail fra oss straks vi har fått svart på mailen.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-all shadow-lg shadow-green-900/20 hover:scale-105"
                    >
                        Lukk vinduet
                    </button>

                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
