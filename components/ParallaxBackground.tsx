import React, { useEffect, useState } from 'react';

const ParallaxBackground: React.FC = () => {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Layer 1: Very slow moving deep background blobs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[100px]"
                style={{ transform: `translateY(${offsetY * 0.1}px)` }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[120px]"
                style={{ transform: `translateY(${offsetY * 0.05}px)` }}
            />

            {/* Layer 2: Medium speed decorative elements */}
            <div
                className="absolute top-[20%] right-[10%] w-64 h-64 bg-accent/5 rounded-full blur-[80px]"
                style={{ transform: `translateY(${offsetY * 0.2}px)` }}
            />
            <div
                className="absolute top-[60%] left-[5%] w-48 h-48 bg-purple-500/5 rounded-full blur-[60px]"
                style={{ transform: `translateY(${offsetY * 0.15}px)` }}
            />

            {/* Layer 3: Slightly faster small details */}
            <div
                className="absolute top-[40%] left-[20%] w-4 h-4 bg-accent/20 rounded-full blur-[2px]"
                style={{ transform: `translateY(${offsetY * 0.3}px)` }}
            />
            <div
                className="absolute top-[80%] right-[25%] w-6 h-6 bg-blue-400/10 rounded-full blur-[4px]"
                style={{ transform: `translateY(${offsetY * 0.25}px)` }}
            />
        </div>
    );
};

export default ParallaxBackground;
