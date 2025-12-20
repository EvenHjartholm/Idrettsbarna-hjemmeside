import React, { useEffect, useState } from 'react';
import { Fish } from 'lucide-react';
import { Theme } from '../types';

export type CreatureType = 'fish' | 'turtle' | 'crab' | 'shell' | 'anchor';
export type AnimationType = 'peek-up' | 'peek-right' | 'swim-left' | 'swim-right' | 'hover';

interface SeaCreatureProps {
    type: CreatureType;
    animation: AnimationType;
    theme: Theme;
    className?: string; // For absolute positioning
    delay?: number; // Animation delay in seconds
    color?: string; // Optional override
}

const SeaCreature: React.FC<SeaCreatureProps> = ({ type, animation, theme, className = '', delay = 0, color }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger visibility after a small delay to ensure mounting
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const isNordic = theme === 'nordic';
    
    // Default elegant colors (silhouettes)
    const defaultColor = isNordic 
        ? 'text-slate-200' 
        : 'text-slate-800';

    const finalColor = color || defaultColor;

    // Render the correct icon
    const renderIcon = () => {
        const props = { size: '100%', strokeWidth: 1.5, className: finalColor };
        return <Fish {...props} />;
    };

    // Animation Styles
    const getAnimationClass = () => {
        switch (animation) {
            case 'peek-up':
                return 'animate-peek-up'; // Need to define this in tailwind or custom CSS
            case 'peek-right':
                return 'animate-peek-right';
            case 'swim-left':
                return 'animate-swim-left';
            case 'swim-right':
                return 'animate-swim-right';
            case 'hover':
                return 'animate-float';
            default:
                return '';
        }
    };

    // Inline styles for custom animations that might not be in Tailwind config yet
    // We'll use style for specific delays and durations
    const style: React.CSSProperties = {
        animationDelay: `${delay}s`,
        opacity: isVisible ? 0.6 : 0, // Gentle opacity
        transition: 'opacity 1s ease-in-out',
    };

    // DEBUG: Red mark request
    const debugStyle = "border-2 border-red-500 bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.6)]";
    const debugText = (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap animate-pulse z-50">
            HER ER JEG! 📍
        </div>
    );

    return (
        <div 
            className={`absolute pointer-events-none select-none z-50 ${className} ${getAnimationClass()} ${debugStyle}`}
            style={{...style, opacity: 1}}
            title="Du fant meg! 🌊"
        >
            {debugText}
            <div className={`w-16 h-16 md:w-24 md:h-24 opacity-100 backdrop-blur-[1px] rounded-full p-2`}> 
               {renderIcon()}
            </div>
        </div>
    );
};

export default SeaCreature;
