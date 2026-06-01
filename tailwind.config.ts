import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        caramel: {
          DEFAULT: "#8B5E3C",
          light: "#A67B5B",
          dark: "#6B4528",
        },
        blush: {
          DEFAULT: "#F5C5C5",
          dark: "#E8A8A8",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#F5EDE0",
        },
        ink: {
          DEFAULT: "#1A0A00",
          muted: "#5C4A3A",
          light: "#8A7A6A",
        },
        mpesa: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
          light: "#66BB6A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(26, 10, 0, 0.08)",
        card: "0 2px 16px rgba(26, 10, 0, 0.06)",
        elevated: "0 24px 64px -16px rgba(139, 94, 60, 0.18)",
      },
      animation: {
        pulseMpesa: "pulseMpesa 2s ease-in-out infinite",
        bounceHeart: "bounceHeart 0.4s ease",
      },
      keyframes: {
        pulseMpesa: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(76, 175, 80, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(76, 175, 80, 0)" },
        },
        bounceHeart: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
