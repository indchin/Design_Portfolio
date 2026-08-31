import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/content/**/*.{md,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          elevated: "hsl(var(--surface-elevated))"
        },
        accent: {
          blue: "#67e8f9",
          green: "#8bffbe",
          rose: "#ff7ab6",
          amber: "#ffe08a"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 80px rgba(103, 232, 249, 0.18)",
        "soft-inset": "inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.42)"
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
        "radial-field": "radial-gradient(circle at 20% 20%, rgba(103, 232, 249, 0.18), transparent 30%), radial-gradient(circle at 82% 22%, rgba(255, 122, 182, 0.16), transparent 25%), radial-gradient(circle at 50% 90%, rgba(139, 255, 190, 0.12), transparent 34%)"
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.04)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.38" },
          "50%": { opacity: "0.7" }
        }
      },
      animation: {
        aurora: "aurora 12s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
