"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        animation: {
            bounce: "bounce 1s infinite",
        },
        keyframes: {
            bounce: {
                "0%,100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-10px)" },
            },
        },
    },
    plugins: [],
};
exports.default = config;
