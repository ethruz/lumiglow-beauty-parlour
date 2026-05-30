/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFBF7",
        blush: {
          50:  "#FFF0F5",
          100: "#FFE0EC",
          200: "#FFC2D8",
          300: "#FF94BB",
          400: "#F472B6",
          500: "#EC4899",
          600: "#DB2777",
        },
        berry: {
          50:  "#F9F0F4",
          100: "#F0D6E4",
          200: "#E0ADC8",
          300: "#C97BA4",
          400: "#A84D7E",
          500: "#6B1A3A",
          600: "#4A0F27",
          700: "#2E0818",
        },
        rose: {
          mist: "#FDE8EF",
          petal: "#FBCFE8",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        soft:  "0 4px 24px rgba(107, 26, 58, 0.08)",
        glow:  "0 8px 40px rgba(244, 114, 182, 0.25)",
        card:  "0 2px 16px rgba(107, 26, 58, 0.10)",
        hover: "0 12px 40px rgba(107, 26, 58, 0.18)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #FFF0F5 0%, #FDE8EF 50%, #FBCFE8 100%)",
        "card-gradient": "linear-gradient(145deg, #FFFBF7 0%, #FFF0F5 100%)",
        "berry-gradient": "linear-gradient(135deg, #6B1A3A 0%, #A84D7E 100%)",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "float":      "float 3s ease-in-out infinite",
        "shimmer":    "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
}
