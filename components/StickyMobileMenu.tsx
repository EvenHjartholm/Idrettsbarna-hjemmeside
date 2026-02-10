import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface StickyMobileMenuProps {
    isVisible: boolean;
    onScrollToSchedule: () => void;
    onOpenContact: () => void;
}

const StickyMobileMenu: React.FC<StickyMobileMenuProps> = ({ isVisible, onScrollToSchedule, onOpenContact }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed top-[72px] left-0 right-0 z-40 px-4 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200 md:hidden shadow-sm">
            <div className="flex gap-3 justify-center max-w-sm mx-auto">
                <button
                    onClick={onScrollToSchedule}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-wide"
                >
                    Til kurstider <ArrowRight size={14} />
                </button>
                <button
                    onClick={onOpenContact}
                    className="flex-1 bg-transparent hover:bg-slate-50 text-slate-900 text-xs font-bold py-3 px-4 rounded-full border border-slate-300 flex items-center justify-center gap-2 transition-transform active:scale-95 uppercase tracking-wide"
                >
                    Kontakt oss <MessageCircle size={14} />
                </button>
            </div>
        </div>
    );
};

export default StickyMobileMenu;
