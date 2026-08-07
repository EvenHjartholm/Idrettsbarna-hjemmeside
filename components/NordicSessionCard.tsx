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
        if (isFull(spots)) return 'bg-stone-100 text-stone-400 border border-stone-200';
        const num = typeof spots === 'number' ? spots : 10;
        if (num <= 2) return 'bg-emerald-50/60 text-emerald-500 border border-emerald-100';
        if (num <= 5) return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
        return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
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
            className={`session-card-nordic w-full group text-left pl-5 pr-4 py-3 md:pl-6 md:pr-5 md:py-4 rounded-r-xl transition-all duration-300 ease-out border border-l-0 relative min-h-[4rem] md:min-h-[5.5rem] origin-center ${isActive
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
                        <span className={`font-serif text-xl ${isFocused ? 'text-slate-900' : 'text-slate-500 md:text-slate-900'} transition-colors duration-500 group-hover:text-slate-900`}>
                            {session.time.split(" - ")[0]}
                        </span>
                    </div>
                    
                    <div className="flex flex-col space-y-1 min-w-0">
                            {/* Fixed text size for performance - no layout shift */}
                            <h4 className={`font-serif text-2xl md:text-3xl ${isFocused ? 'text-slate-900' : 'text-slate-500 md:text-slate-900'} leading-tight transition-colors duration-500 group-hover:text-slate-900`}>
                                {session.level}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Users size={13} className="text-slate-400" />
                                    <p className="text-slate-600 text-base md:text-sm font-bold uppercase tracking-wide">
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
                        (session.spots === 0 || (typeof session.spots === 'string' && (session.spots.includes('Venteliste') || session.spots.includes('Fullt') || session.spots.includes('0 ledige')))) ? (
                            <div className="flex flex-col items-end gap-0.5">
                                <span className="text-xs uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap bg-stone-100 text-stone-500 border border-stone-200">
                                    Venteliste
                                </span>
                                <span className="text-[10px] text-stone-400 font-medium tracking-wide pr-0.5">
                                    0 ledige
                                </span>
                            </div>
                        ) : (
                            <span className={`text-sm uppercase font-bold px-3 py-1 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
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
                                <span className="text-sm uppercase font-bold px-3.5 py-1 rounded-full whitespace-nowrap bg-stone-100 text-stone-500 border border-stone-200">
                                    Venteliste
                                </span>
                                <span className="text-xs text-stone-400 font-medium pl-1">
                                    0 ledige
                                </span>
                            </div>
                        ) : (
                            <span className={`text-base uppercase font-bold px-4 py-1.5 rounded-full whitespace-nowrap ${getNordicSpotClass(session.spots)}`}>
                                {typeof session.spots === 'number' 
                                    ? (session.spots === 1 ? 'Kun 1 ledig' : `${session.spots} ledige plasser`)
                                    : session.spots.replace(' plasser ledige', '').replace(' plass ledig', '')}
                            </span>
                        )
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
