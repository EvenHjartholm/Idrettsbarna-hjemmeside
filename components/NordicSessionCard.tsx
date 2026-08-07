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
    
    const isFull = (spots: number | string | undefined) =>
        spots === 0 || (typeof spots === 'string' && (spots.includes('Venteliste') || spots.includes('Fullt') || spots.includes('0 ledige')));

    // Helper for Nordic Spot Styles
    const getNordicSpotClass = (spots: number | string | undefined) => {
        if (isFull(spots)) return 'text-stone-400 border border-stone-200';
        const num = typeof spots === 'number' ? spots : 10;
        if (num <= 2) return 'text-emerald-700/70 border border-emerald-700/15';
        return 'text-emerald-800 border border-emerald-800/20';
    };

    // Skinnen på venstre kant koder tilgjengelighet: full amber med drift når
    // det er god plass, dempet når det er få igjen, grå og stille når det er fullt.
    const getRailClass = (spots: number | string | undefined) => {
        if (!isActive || isFull(spots)) return 'schedule-rail-off';
        const num = typeof spots === 'number' ? spots : 10;
        return num <= 2 ? 'schedule-rail-soft' : 'schedule-rail-live';
    };

    return (
        <button 
            id={id}
            type="button"
            onClick={() => onClick(session, day)}
            disabled={!isActive}
            className={`session-card-nordic w-full group text-left pl-5 pr-4 py-4 md:pl-7 md:pr-6 md:py-6 rounded-r-xl transition-all duration-300 ease-out border border-l-0 relative min-h-[4rem] md:min-h-[5.5rem] origin-center ${isActive
                ? `cursor-pointer ${isFocused
                    ? 'opacity-100 bg-white shadow-xl shadow-slate-900/5 border-stone-400 ring-1 ring-stone-300 z-10 scale-[1.02] md:scale-100 md:shadow-sm md:border-stone-300 md:ring-0 md:z-auto md:hover:shadow-md md:hover:border-stone-400'
                    : 'opacity-100 bg-white border-stone-300 hover:shadow-md scale-100 md:scale-100'}`
                : 'bg-[#FDFDFD] opacity-100 cursor-default border-stone-200 scale-100 md:scale-100'}`}
        >
            <span aria-hidden="true" className={`schedule-rail ${getRailClass(session.spots)}`} />

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-3">
                
                {/* Left: Time & Content */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                    <div className="flex flex-col py-0.5 shrink-0">
                        <span className={`font-serif text-lg tabular-nums ${isFocused ? 'text-stone-500' : 'text-stone-400 md:text-stone-500'} transition-colors duration-500 group-hover:text-stone-600`}>
                            {session.time.split(" - ")[0]}
                        </span>
                    </div>
                    
                    <div className="flex flex-col space-y-1 min-w-0">
                            {/* Fixed text size for performance - no layout shift */}
                            <h4 className={`font-serif text-xl md:text-2xl ${isFocused ? 'text-slate-900' : 'text-slate-600 md:text-slate-900'} leading-snug transition-colors duration-500 group-hover:text-slate-900`}>
                                {session.level}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Users size={12} strokeWidth={1.5} className="text-stone-400" />
                                    <p className="text-stone-500 text-[11px] font-medium uppercase tracking-[0.16em]">
                                        {session.ageGroup}
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>

                {/* Right: Spots & Action */}
                {/* Desktop Right: Spots & Action */}
                <div className="hidden sm:flex flex-row-reverse items-center justify-start shrink-0 gap-4 pl-6">
                    
                    <div className={`flex items-center justify-center transition-all duration-300 ${session.serviceId
                        ? 'text-stone-300 group-hover:text-amber-700 group-hover:translate-x-1'
                        : 'text-stone-200'
                    }`}>
                        <ChevronRight size={18} strokeWidth={1.25} />
                    </div>

                    {session.spots && (
                        (session.spots === 0 || (typeof session.spots === 'string' && (session.spots.includes('Venteliste') || session.spots.includes('Fullt') || session.spots.includes('0 ledige')))) ? (
                            <span className="uppercase font-medium tracking-[0.12em] px-2.5 py-1 rounded-[3px] whitespace-nowrap text-[11px] text-stone-400 border border-stone-200">
                                Venteliste
                            </span>
                        ) : (
                            <span className={`uppercase font-medium tracking-[0.12em] px-2.5 py-1 rounded-[3px] whitespace-nowrap text-[11px] ${getNordicSpotClass(session.spots)}`}>
                                {typeof session.spots === 'number' 
                                    ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                    : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                            </span>
                        )
                    )}
                </div>

                {/* Mobile Footer: Spots Left, Arrow Right */ }
                <div className="flex sm:hidden items-center justify-between w-full pt-3 mt-3 border-t border-slate-100">
                    {session.spots && (
                        (session.spots === 0 || (typeof session.spots === 'string' && (session.spots.includes('Venteliste') || session.spots.includes('Fullt') || session.spots.includes('0 ledige')))) ? (
                            <div className="flex flex-col items-start gap-0.5">
                                <span className="text-[11px] uppercase font-medium tracking-[0.12em] px-2.5 py-1 rounded-[3px] whitespace-nowrap text-[11px] bg-stone-100 text-stone-500 border border-stone-200">
                                    Venteliste
                                </span>
                                <span className="text-xs text-stone-400 font-medium pl-1">
                                    0 ledige
                                </span>
                            </div>
                        ) : (
                            <span className={`text-[11px] uppercase font-medium tracking-[0.12em] px-2.5 py-1 rounded-[3px] whitespace-nowrap text-[11px] ${getNordicSpotClass(session.spots)}`}>
                                {typeof session.spots === 'number' 
                                    ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                    : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                            </span>
                        )
                    )}
                    <div className={`flex items-center justify-center transition-all duration-300 ${session.serviceId
                        ? 'text-stone-300'
                        : 'text-stone-200'
                    }`}>
                        <ChevronRight size={18} strokeWidth={1.25} />
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
