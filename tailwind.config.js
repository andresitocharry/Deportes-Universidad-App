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
        },
    },
    plugins: [],
}
