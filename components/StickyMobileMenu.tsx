import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface StickyMobileMenuProps {
    isVisible: boolean;
    onScrollToSchedule: () => void;
    onOpenContact: () => void;
}

const StickyMobileMenu: React.FC<StickyMobileMenuProps> = ({ isVisible, onScrollToSchedule, onOpenContact }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed top-[72px] left-0 right-0 z-40 px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-white/10 md:hidden animate-fade-in-down transition-all duration-300 shadow-lg">
            <div className="flex gap-3 justify-center">
                <button
                    onClick={onScrollToSchedule}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-2.5 px-4 rounded-full shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    Meld på kurs <ArrowRight size={14} />
                </button>
                <button
                    onClick={onOpenContact}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-4 rounded-full border border-slate-700 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    Kontakt oss <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default StickyMobileMenu;
