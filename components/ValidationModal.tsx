import React from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';

interface ValidationModalProps {
    isOpen: boolean;
    onClose: () => void;
    errors: string[];
}

const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose, errors }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-cyan-500/30 flex flex-col overflow-hidden animate-scale-up">

                {/* Header */}
                <div className="p-6 bg-cyan-950/30 border-b border-cyan-500/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="text-cyan-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Mangler informasjon</h2>
                        <p className="text-sm text-cyan-200">Vennligst sjekk følgende:</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Error List */}
                <div className="p-6">
                    <ul className="space-y-3">
                        {errors.map((error, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-300 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></span>
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-slate-900/50">
                    <button
                        onClick={onClose}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
                    >
                        Gå til skjema <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValidationModal;
