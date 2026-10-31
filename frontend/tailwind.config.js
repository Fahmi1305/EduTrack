/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finnova: {
          bg: '#F5F7FA',
          card: '#FFFFFF',
          indigo: '#5E5CE6',
          'indigo-hover': '#4B49C8',
          'indigo-light': '#EEF2FF',
          'indigo-soft': '#E0E7FF',
          'indigo-card': '#5B58EB',
          charcoal: '#16171D',
          'charcoal-pill': '#14151A',
          'charcoal-item': '#1F2028',
          'charcoal-hover': '#262832',
          lavender: '#A5B4FC',
          teal: '#0D9488',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'finnova-card': '0 4px 24px rgba(15, 23, 42, 0.04)',
        'finnova-glow': '0 10px 25px -5px rgba(94, 92, 230, 0.35)',
        'finnova-pill': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'finnova-dark': '0 20px 40px -15px rgba(15, 23, 42, 0.25)'
      }
    },
  },
  plugins: [],
}
