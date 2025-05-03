/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FFEB3B',
        background: '#D0F0C0',
        darkgreen: '#2E7D32',
        text_main: '#212121',
        text_sub: '#757575',
      }
    },
  },
  plugins: [],
}