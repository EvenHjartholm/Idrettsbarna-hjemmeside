import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { CourseSession } from '../types';

interface NordicSessionCardProps {
    id: string; // Required for IntersectionObserver
    session: CourseSession;
    day: string;
    isActive: boolean;
    isFocused: boolean;
    onClick: (session: CourseSession, day: string) => void;
}

const NordicSessionCard: React.FC<NordicSessionCardProps> = React.memo(({ 
    id,
    session, 
    day, 
    isActive, 
    isFocused, 
    onClick 
}) => {
    
    // Helper for Nordic Spot Styles
    const getNordicSpotClass = (spots: number | string | undefined) => {
        if (typeof spots === 'string' && spots.startsWith('Venteliste')) return 'bg-slate-100 text-slate-500 border border-slate-200';
        const num = typeof spots === 'number' ? spots : 10; // Default to safe
        if (num <= 2 || spots === 'Få ledige') return 'bg-slate-900 text-white';
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    };

    return (
        <button 
            id={id}
            type="button"
            onClick={() => onClick(session, day)}
            disabled={!isActive}
            className={`session-card-nordic w-full group text-left px-4 py-3 md:px-5 md:py-4 rounded-xl transition-all duration-500 ease-out border relative min-h-[4rem] md:min-h-[5.5rem] ${isActive 
                ? `cursor-pointer ${isFocused 
                    ? 'opacity-100 bg-white shadow-lg border-slate-900 ring-1 ring-slate-900 z-10 md:shadow-sm md:border-slate-200 md:ring-0 md:z-auto md:hover:shadow-md md:hover:border-slate-300' 
                    : 'opacity-50 md:opacity-100 hover:opacity-100 grayscale md:grayscale-0 hover:grayscale-0 bg-white/60 md:bg-white border-slate-200 hover:shadow-md'}`
                : 'bg-slate-50 opacity-30 cursor-default border-slate-100 grayscale'}`}
        >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-3">
                
                {/* Left: Time & Content */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                    <div className={`flex flex-col border-l-[3px] ${isFocused ? 'border-amber-700 md:border-slate-200 md:group-hover:border-amber-700' : 'border-slate-300'} pl-3 py-0.5 shrink-0 transition-colors duration-500 group-hover:border-amber-700`}>
                        <span className={`font-serif text-xl ${isFocused ? 'text-slate-900' : 'text-slate-500'} transition-colors duration-500 group-hover:text-slate-900`}>
                            {session.time.split(" - ")[0]}
                        </span>
                    </div>
                    
                    <div className="flex flex-col space-y-1 min-w-0">
                            {/* Fixed text size for performance - no layout shift */}
                            <h4 className={`font-serif text-2xl md:text-3xl ${isFocused ? 'text-slate-900' : 'text-slate-500'} leading-tight truncate transition-colors duration-500 group-hover:text-slate-900`}>
                                {session.level}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Users size={12} className="text-slate-400" />
                                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                        {session.ageGroup}
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>

                {/* Right: Spots & Action */}
                {/* Desktop Right: Spots & Action */}
                <div className="hidden sm:flex flex-col items-end justify-center shrink-0 border-l border-slate-100 min-w-[90px] self-stretch gap-1.5 pl-3">
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${session.serviceId
                        ? 'bg-slate-100 text-slate-900 group-hover:bg-amber-100 group-hover:text-amber-800'
                        : 'bg-slate-50 text-slate-200'
                    }`}>
                        <ChevronRight size={16} />
                    </div>

                    {session.spots && (
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                            {typeof session.spots === 'number' 
                                ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                        </span>
                    )}
                </div>

                {/* Mobile Footer: Spots Left, Arrow Right */ }
                <div className="flex sm:hidden items-center justify-between w-full pt-3 mt-3 border-t border-slate-100">
                    {session.spots && (
                        <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                            {typeof session.spots === 'number' 
                                ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                        </span>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${session.serviceId
                        ? 'bg-slate-100 text-slate-900 group-hover:bg-slate-200'
                        : 'bg-slate-50 text-slate-200'
                    }`}>
                        <ChevronRight size={20} />
                    </div>
                </div>
            </div>
        </button>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isFocused === nextProps.isFocused &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.session === nextProps.session &&
        prevProps.day === nextProps.day &&
        prevProps.id === nextProps.id
    );
});

export default NordicSessionCard;
