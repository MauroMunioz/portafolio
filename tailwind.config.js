/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#05040c",
        void: "#05040c",
        "nebula-deep": "#1b1035",
        nebula: "#3a1e6d",
        "signal-cyan": "#5ef0ff",
        "engine-amber": "#ff8a3d",
        "ion-white": "#eaf6ff",
        secondary: "#8f9bc4",
        tertiary: "#0d0b1e",
        "black-100": "#0a0818",
        "black-200": "#070512",
        "white-100": "#eaf6ff",
      },
      fontFamily: {
        hud: ['"Space Mono"', "monospace"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #10143a",
        glow: "0 0 20px rgba(94, 240, 255, 0.25)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
