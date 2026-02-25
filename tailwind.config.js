/** @type {import('tailwindcss').Config} */
module.exports = {
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
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-out',
            },
        },
    },
    plugins: [],
}
