import React, { useEffect, useState } from 'react';
import { Fish } from 'lucide-react';
import { Theme } from '../types';

export type CreatureType = 'fish' | 'starfish' | 'crab' | 'shell' | 'anchor';
export type AnimationType = 'peek-up' | 'peek-right' | 'swim-left' | 'swim-right' | 'hover';
export type Size = 'sm' | 'md' | 'lg';

interface SeaCreatureProps {
    type: CreatureType;
    animation: AnimationType;
    theme: Theme;
    className?: string; // For absolute positioning
    delay?: number; // Animation delay in seconds
    color?: string; // Optional override
    size?: Size;
}

const SeaCreature: React.FC<SeaCreatureProps> = ({ type, animation, theme, className = '', delay = 0, color, size = 'md' }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger visibility after a small delay to ensure mounting
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const isNordic = theme === 'nordic';
    
    // Default elegant colors (silhouettes)
    const defaultColor = isNordic 
        ? 'text-slate-300' 
        : 'text-slate-700';

    const finalColor = color || defaultColor;

    // Size helper
    const getSizeClass = () => {
        switch(size) {
            case 'sm': return 'w-12 h-12 md:w-16 md:h-16'; // Increased from w-8
            case 'lg': return 'w-32 h-32 md:w-48 md:h-48'; // Increased from w-24
            default: return 'w-20 h-20 md:w-28 md:h-28'; // Increased from w-16
        }
    };

    // Render the correct icon
    const renderIcon = () => {
        const props = { size: '100%', strokeWidth: 1.5, className: finalColor };
        
        // Custom SVGs for missing Lucide icons to maintain style
        switch (type) {
            case 'crab':
                return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={finalColor}>
                        <path d="M18 12c.93-3.14 2-5 2-5" />
                        <path d="M6 12c-.93-3.14-2-5-2-5" />
                        <path d="M14.4 7a2 2 0 1 0 0-3.5 2 2 0 0 0 0 3.5" />
                        <path d="M9.6 7a2 2 0 1 0 0-3.5 2 2 0 0 0 0 3.5" />
                        <path d="M7 16a4 4 0 0 0 10 0" />
                        <path d="M17 19.4c1.1.53 2.6.27 3.6-1" />
                        <path d="M7 19.4c-1.1.53-2.6.27-3.6-1" />
                        <rect x="2" y="12" width="20" height="4" rx="2" className="opacity-0" />{/* Spacer */}
                        <path d="M5 12h14" />
                    </svg>
                    // Simple Crab
                );
            case 'shell':
                return (
                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={finalColor}>
                        <path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7" />
                        <path d="M5 12v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3" />
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                        <path d="M8 8l-2 2" />
                        <path d="M16 8l2 2" />
                    </svg>
                );
            case 'starfish':
                 return (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={finalColor}>
                        <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8L6 21.2l2.4-7.2-6-4.8h7.6z" />
                        <circle cx="12" cy="13" r="1.5" />
                    </svg>
                );
            case 'fish':
            default:
                return <Fish {...props} />;
        }
    };

    // Animation Styles
    const getAnimationClass = () => {
        switch (animation) {
            case 'peek-up': return 'animate-peek-up';
            case 'peek-right': return 'animate-peek-right';
            case 'swim-left': return 'animate-swim-left';
            case 'swim-right': return 'animate-swim-right';
            case 'hover': return 'animate-float';
            default: return '';
        }
    };

    // Inline styles for custom delays and durations
    const style: React.CSSProperties = {
        animationDelay: `${delay}s`,
        opacity: isVisible ? (animation.startsWith('swim') ? 0.8 : 0.6) : 0, 
        transition: 'opacity 1s ease-in-out',
        width: 'fit-content',
        height: 'fit-content'
    };

    return (
        <div 
            className={`absolute pointer-events-none select-none z-0 ${className} ${getAnimationClass()}`}
            style={style}
            title={isNordic ? "Du fant meg! 🌊" : "You found me!"}
        >
            <div className={`${getSizeClass()} opacity-80 backdrop-blur-[0px] p-2`}> 
               {renderIcon()}
            </div>
        </div>
    );

};

export default SeaCreature;
