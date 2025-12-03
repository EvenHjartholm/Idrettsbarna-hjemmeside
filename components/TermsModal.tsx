import React, { useEffect } from 'react';
import { X, FileText, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh] animate-fade-in-up">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/50 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        Vilkår for påmelding
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8 text-slate-300">

                    {/* Section 1: Bindende påmelding */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            1. Bindende påmelding
                        </h3>
                        <p className="leading-relaxed">
                            Påmeldingen til våre svømmekurs er bindende. Hvis bassengene stenges av årsaker utenfor Idrettsbarna Svøm og Foto AS sin kontroll (force majeure), refunderes ikke kursavgiften, og fakturaen forblir gjeldende.
                        </p>
                    </section>

                    {/* Section 2: Prisregulering */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-blue-400" />
                            2. Prisregulering
                        </h3>
                        <p className="leading-relaxed">
                            Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til kursdeltakerne. Vi håper dette ikke blir nødvendig, men må forholde oss til endringer som kan komme.
                        </p>
                    </section>

                    {/* Section 3: Avmelding */}
                    <section>
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-400" />
                            3. Avmelding
                        </h3>
                        <p className="leading-relaxed">
                            Ettersom påmelding er bindende, påløper det et gebyr på kr. 500 ved avmelding før kursstart, dersom vi finner en erstatter.
                        </p>
                    </section>

                    <div className="pt-6 border-t border-white/10 text-center">
                        <p className="text-slate-500 text-sm">
                            Sist oppdatert: 26. November 2025
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50 rounded-b-2xl flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-colors"
                    >
                        Lukk og fortsett
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TermsModal;
