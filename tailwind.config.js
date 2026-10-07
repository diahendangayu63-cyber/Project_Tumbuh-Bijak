/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F8F9FA',
          50: '#FFFFFF',
          100: '#FAFBFB',
          200: '#F4F5F6',
          300: '#ECEEF0',
          400: '#DEE2E6',
        },
        maroon: {
          DEFAULT: '#800000',
          50: '#FDF2F2',
          100: '#FCE7E7',
          200: '#F8D1D1',
          300: '#EFA6A6',
          400: '#DF6C6C',
          500: '#BD3333',
          600: '#A31919',
          700: '#800000',
          800: '#660000',
          900: '#4D0000',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(128, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 25px -3px rgba(128, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'nav': '0 -4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
