/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(113, 42, 133)', // The purple from header/buttons
          dark: '#5025d1',
          light: '#8B728E',
        },
        accent: {
          DEFAULT: 'rgb(229, 184, 33)', // The gold color
          hover: 'rgb(139, 114, 142)',
        },
        dark: '#1d1e20',
        light: '#ffffff',
      },
      fontFamily: {
        primary: ['Outfit', 'sans-serif'], // Headings
        secondary: ['Inter', 'sans-serif'], // Body
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(23, 107, 224, 0.45), rgba(143, 17, 168, 0.45))',
      }
    },
  },
  plugins: [],
}