import React, { useEffect, useState, useRef } from 'react';

interface ParallaxWrapperProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
    disabled?: boolean;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
    children,
    speed = 0.05,
    className = "",
    disabled = false
}) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            // Calculate distance from top of viewport
            const rect = ref.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const elementTop = rect.top + scrollTop;

            // Only animate if element is somewhat visible or close to viewport to save performance
            // For simplicity in this "global feel" request, we'll just use global scroll
            // A simple parallax is often just: translateY = scrollY * speed

            setOffset(window.scrollY * speed);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    if (disabled) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div
            ref={ref}
            className={`relative will-change-transform ${className}`}
            style={{ transform: `translateY(-${offset}px)` }}
        >
            {children}
        </div>
    );
};

export default ParallaxWrapper;
