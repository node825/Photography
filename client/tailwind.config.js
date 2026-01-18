/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E8A598',        // Soft coral (for headings, main accents)
        secondary: '#F5D5D0',      // Light blush pink (for subtle backgrounds)
        accent: '#D4837E',         // Deeper coral/rose (for buttons, CTAs)
        accentDark: '#C06B66',     // Darker rose (for hover states)
        background: '#FFFBF7',     // Warm cream/off-white (main background)
        lightPink: '#FAE8E5',      // Very light pink (for sections)
        mediumPink: '#E8A598',     // Medium coral-pink
        lightGray: '#FAF5F2',      // Very light warm gray
        mediumGray: '#C9B5B0',     // Warm medium gray
        darkGray: '#8B7570',       // Warm dark gray
        textDark: '#6B4E4A',       // Warm dark gray-brown (main text)
        textLight: '#9B8682',      // Warm medium gray (secondary text)
      },
      fontFamily: {
        sans: ['Inter', 'Heebo', 'sans-serif'],
        heading: ['Montserrat', 'Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
