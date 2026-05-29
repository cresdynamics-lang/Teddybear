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
        brand: {
          50: "#faf6f3",
          100: "#f3ebe3",
          200: "#e6d4c4",
          300: "#d4b49a",
          400: "#c08f6e",
          500: "#b07352",
          600: "#9a5c42",
          700: "#7f4a38",
          800: "#6a3f33",
          900: "#5a362d",
        },
        plum: {
          DEFAULT: "#6D2E46",
          light: "#8B3D5C",
          dark: "#4A1F30",
        },
        honey: {
          DEFAULT: "#E9B44C",
          light: "#F2CC8F",
          dark: "#C4922E",
        },
        sage: {
          DEFAULT: "#81B29A",
          light: "#A8D4BC",
          dark: "#5E9178",
        },
        ivory: {
          DEFAULT: "#FEFAE0",
          dark: "#F5EDE4",
        },
        cocoa: "#2D1F22",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(109, 46, 70, 0.12)",
        glow: "0 8px 32px -8px rgba(233, 180, 76, 0.35)",
        card: "0 2px 16px rgba(45, 31, 34, 0.06)",
        elevated: "0 20px 50px -12px rgba(74, 31, 48, 0.2)",
      },
      animation: {
        shimmer: "shimmer 1.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(233,180,76,0.25) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(129,178,154,0.2) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 60% 80%, rgba(109,46,70,0.12) 0%, transparent 50%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
