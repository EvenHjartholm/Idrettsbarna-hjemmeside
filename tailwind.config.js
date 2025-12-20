/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                // Semantic colors mapped to CSS variables
                primary: 'var(--bg-primary)',
                secondary: 'var(--bg-secondary)',
                tertiary: 'var(--bg-tertiary)',

                txt: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    muted: 'var(--text-muted)',
                },

                accent: {
                    DEFAULT: 'var(--accent)',
                    hover: 'var(--accent-hover)',
                    dim: 'var(--accent-dim)',
                },

                border: 'var(--border-color)',

                // Keep original palette for specific utility needs if any
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    900: '#164e63',
                },
                slate: {
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
                'fade-in': 'fade-in 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
                'wave-slow': 'wave-slow 20s ease-in-out infinite alternate',
                'surf': 'surf 20s linear infinite',
                'spin-slow': 'spin 12s linear infinite',
                'peek-up': 'peek-up 3s ease-in-out infinite',
                'swim-left': 'swim-left 12s linear infinite',
                'swim-right': 'swim-right 10s linear infinite',
                'peek-right': 'peek-up 3s ease-in-out infinite', // Reusing peek-up logic but maybe rotating in CSS if needed, or define peek-right keyframe later. For now mapping to peek-up to avoid crash if used.
            },
            keyframes: {
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.1)' },
                },
                'wave-slow': {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '100%': { transform: 'translate(-50%, -20%) rotate(10deg)' },
                },
                'peek-up': {
                    '0%, 100%': { transform: 'translateY(100%)' },
                    '50%': { transform: 'translateY(0%)' },
                },
                'swim-left': {
                    '0%': { right: '-20%', transform: 'translateX(0)' },
                    '100%': { right: '100%', transform: 'translateX(-100%)' },
                },
                'swim-right': {
                    '0%': { left: '-20%', transform: 'translateX(0)' },
                    '100%': { left: '100%', transform: 'translateX(100%)' },
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
