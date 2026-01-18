/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',        // Bright gold (for headings, main accents)
        secondary: '#B8956A',      // Warm gold (for subtle backgrounds)
        accent: '#DAA520',         // Golden rod (for buttons, CTAs)
        accentDark: '#AA8C2C',     // Darker gold (for hover states)
        background: '#0F0F0F',     // Deep black (main background)
        lightPink: '#1A1A1A',      // Very dark gray (for sections)
        mediumPink: '#2A2A2A',     // Medium dark gray
        lightGray: '#3A3A3A',      // Light dark gray
        mediumGray: '#555555',     // Warm medium gray
        darkGray: '#1A1A1A',       // Deep dark gray
        textDark: '#F5F5F5',       // Off-white (main text)
        textLight: '#B0B0B0',      // Light gray (secondary text)
      },
      fontFamily: {
        sans: ['Inter', 'Heebo', 'sans-serif'],
        heading: ['Montserrat', 'Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
