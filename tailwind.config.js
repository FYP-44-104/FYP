/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6F61',    // Coral
        secondary: '#40E0D0',  // Turquoise
        accent: '#FFD300',     // Cyber Yellow
      },
      animation: {
        'glitch': 'glitch 0.3s infinite linear alternate-reverse',
      },
      backdropFilter: {
        'glass': 'blur(16px) saturate(180%)',
      },
    },
  },
  plugins: [],
};