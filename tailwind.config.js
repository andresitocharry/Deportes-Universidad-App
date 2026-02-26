/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#012567",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#D9F0EE",
                    foreground: "#012567",
                },
                tertiary: {
                    DEFAULT: "#2F8C89",
                    foreground: "#ffffff",
                },
                background: "#ffffff",
                foreground: "#0f172a",
                muted: {
                    DEFAULT: "#f1f5f9",
                    foreground: "#64748b",
                }
            },
            fontFamily: {
                heading: ["Archivo", "sans-serif"],
                body: ["Inter", "sans-serif"],
                data: ["Bebas Neue", "sans-serif"],
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideOutLeft: {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(-60px)' },
                },
                slideOutRight: {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(60px)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-60px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out',
                'slide-out-left': 'slideOutLeft 0.15s ease-in forwards',
                'slide-out-right': 'slideOutRight 0.15s ease-in forwards',
                'slide-in-left': 'slideInLeft 0.2s ease-out forwards',
                'slide-in-right': 'slideInRight 0.2s ease-out forwards',
            },
        },
    },
    plugins: [],
}
