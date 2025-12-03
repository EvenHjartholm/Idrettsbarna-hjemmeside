import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { Theme } from '../types';

interface DesignToggleProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const DesignToggle: React.FC<DesignToggleProps> = ({ currentTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const themes: { id: Theme; name: string; color: string }[] = [
        { id: 'default', name: 'Standard (Cyan)', color: '#22d3ee' },
        { id: 'refined', name: 'Refined (Ocean)', color: '#38bdf8' },
        { id: 'luxury', name: 'Luxury (Gold)', color: '#F59E0B' },
        { id: 'bw', name: 'Structure (B&W)', color: '#ffffff' },
    ];

    return (
        <div className="fixed bottom-6 left-6 z-[100] font-sans">
            <div className={`absolute bottom-full left-0 mb-4 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl transition-all duration-300 origin-bottom-left ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className="flex flex-col gap-1 min-w-[160px]">
                    <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 mb-1">
                        Design Mode
                    </div>
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => onThemeChange(t.id)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentTheme === t.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                                {t.name}
                            </div>
                            {currentTheme === t.id && <Check size={14} className="text-white" />}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-white text-slate-900 rotate-90' : 'bg-slate-900 text-white border border-white/10 hover:border-white/30'}`}
            >
                <Palette size={24} />
            </button>
        </div>
    );
};

export default DesignToggle;
