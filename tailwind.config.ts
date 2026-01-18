import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        // New brand colors
        "rich-black": "#121416",
        "lime-burst": "#C3FF4E",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // SeguDigital Brand Colors
        primary: {
          DEFAULT: "#00D66C",
          foreground: "#FFFFFF",
          50: "#E6FFF3",
          100: "#CCFFE8",
          200: "#99FFD0",
          300: "#66FFB9",
          400: "#33FFA1",
          500: "#00D66C", // Verde principal
          600: "#00A855", // Verde oscuro
          700: "#007A3F",
          800: "#004D2A",
          900: "#002615",
        },
        secondary: {
          DEFAULT: "#FFB800",
          foreground: "#000000",
          50: "#FFF9E6",
          100: "#FFF3CC",
          200: "#FFE799",
          300: "#FFDB66",
          400: "#FFCF33",
          500: "#FFB800", // Amarillo
          600: "#CC9300",
          700: "#996E00",
          800: "#664A00",
          900: "#332500",
        },
        destructive: {
          DEFAULT: "#FF3B30",
          foreground: "#FFFFFF",
          50: "#FFE6E5",
          100: "#FFCCCA",
          200: "#FF9995",
          300: "#FF6660",
          400: "#FF4F44",
          500: "#FF3B30", // Rojo
          600: "#CC2F26",
          700: "#99231D",
          800: "#661813",
          900: "#330C0A",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
      // Glassmorphism utilities
      backdropBlur: {
        xs: '2px',
      },
      // Custom spacing for mobile
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Mobile breakpoints
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom plugin for glassmorphism
    function({ addUtilities }: any) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
        },
        '.neo': {
          background: '#e0e5ec',
          borderRadius: '12px',
          boxShadow: '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff',
        },
        '.neo-inset': {
          background: '#e0e5ec',
          borderRadius: '12px',
          boxShadow: 'inset 9px 9px 16px #a3b1c6, inset -9px -9px 16px #ffffff',
        },
        '.clay': {
          background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
          borderRadius: '16px',
          boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config

export default config
