import React, { useEffect } from 'react';
import { X, FileText, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import { Theme } from '../types';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme?: Theme;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, theme }) => {
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

    const isNordic = theme === 'nordic';

    // Helper for conditional classes
    const colors = {
        backdrop: isNordic ? 'bg-slate-200/60' : 'bg-slate-950/80',
        modalBg: isNordic ? 'bg-[#FAFAF9] border-slate-200' : 'bg-slate-900 border-white/10',
        headerBg: isNordic ? 'bg-white border-slate-100' : 'bg-slate-900/50 border-white/10',
        title: isNordic ? 'text-slate-900 font-serif' : 'text-white',
        text: isNordic ? 'text-slate-600' : 'text-slate-300',
        heading: isNordic ? 'text-slate-900 font-serif' : 'text-white',
        closeBtn: isNordic ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/5',
        divider: isNordic ? 'border-slate-100' : 'border-white/10',
        footerBg: isNordic ? 'bg-white border-slate-100' : 'bg-slate-900/50 border-white/10',
        button: isNordic ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white',
        iconHeader: isNordic ? 'text-slate-900' : 'text-cyan-400',
        iconGreen: isNordic ? 'text-emerald-600' : 'text-green-400',
        iconBlue: isNordic ? 'text-blue-600' : 'text-blue-400',
        iconAmber: isNordic ? 'text-amber-600' : 'text-amber-400',
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 backdrop-blur-sm transition-opacity ${colors.backdrop}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-3xl rounded-2xl shadow-2xl border flex flex-col max-h-[90vh] animate-scale-up ${colors.modalBg}`}>

                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b rounded-t-2xl ${colors.headerBg}`}>
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${colors.title}`}>
                        <FileText className={`w-5 h-5 ${colors.iconHeader}`} />
                        Vilkår for påmelding
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${colors.closeBtn}`}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className={`p-6 overflow-y-auto custom-scrollbar space-y-8 ${colors.text}`}>

                    {/* Section 1: Bindende påmelding */}
                    <section>
                        <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${colors.heading}`}>
                            <CheckCircle className={`w-5 h-5 ${colors.iconGreen}`} />
                            1. Bindende påmelding
                        </h3>
                        <p className="leading-relaxed">
                            Påmeldingen til våre svømmekurs er bindende. Hvis bassengene stenges av årsaker utenfor Idrettsbarna Svøm og Foto AS sin kontroll (force majeure), refunderes ikke kursavgiften, og fakturaen forblir gjeldende.
                        </p>
                    </section>

                    {/* Section 2: Prisregulering */}
                    <section>
                        <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${colors.heading}`}>
                            <CreditCard className={`w-5 h-5 ${colors.iconBlue}`} />
                            2. Prisregulering
                        </h3>
                        <p className="leading-relaxed">
                            Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til kursdeltakerne. Vi håper dette ikke blir nødvendig, men må forholde oss til endringer som kan komme.
                        </p>
                    </section>

                    {/* Section 3: Avmelding */}
                    <section>
                        <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${colors.heading}`}>
                            <AlertCircle className={`w-5 h-5 ${colors.iconAmber}`} />
                            3. Avmelding
                        </h3>
                        <p className="leading-relaxed">
                            Ettersom påmelding er bindende, påløper det et gebyr på kr. 500 ved avmelding før kursstart, dersom vi finner en erstatter.
                        </p>
                    </section>

                    <div className={`pt-6 border-t text-center ${colors.divider}`}>
                        <p className="text-sm opacity-60">
                            Sist oppdatert: 26. November 2025
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-6 border-t rounded-b-2xl flex justify-end ${colors.footerBg}`}>
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 font-bold rounded-full transition-colors shadow-lg ${colors.button}`}
                    >
                        Lukk og fortsett
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TermsModal;
