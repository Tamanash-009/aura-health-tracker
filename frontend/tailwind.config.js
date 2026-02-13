/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Antigravity Palette
                background: '#0a0a0a', // Deep black
                surface: '#121212', // Slightly lighter black
                primary: '#6366f1', // Indigo (keeping base) but can be tweaked to neon
                secondary: '#ec4899', // Pink/Magenta for accents
                accent: '#8b5cf6', // Violet
                success: '#10b981', // Emerald
                warning: '#f59e0b', // Amber
                error: '#ef4444', // Red
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // ensure Inter is used (will add to index.css)
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
            }
        },
    },
    plugins: [],
}
