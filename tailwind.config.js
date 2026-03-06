/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#B2914B",
                    foreground: "#FFFFFF",
                },
                background: "#FDF8F1",
                accent: "#E5C07B",
                muted: "#F5E6CA",
                obsidian: "#1C1917",
            },
            fontFamily: {
                sans: ["Be Vietnam Pro", "sans-serif"],
            },
        },
    },
    plugins: [],
}
