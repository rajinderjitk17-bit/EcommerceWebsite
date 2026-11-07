const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        display: ["'Outfit'", "'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Grotesk'", "monospace"],
        inter: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          950: "#090a0f",
          900: "#0f111a",
          850: "#141724",
          800: "#1a1e30",
          700: "#272c47",
          gold: "#d4af37",
          "gold-light": "#f4e09f",
          cream: "#faf8f5",
        },
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(99, 102, 241, 0.25)",
        "glow-gold": "0 0 35px -5px rgba(212, 175, 55, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
});
