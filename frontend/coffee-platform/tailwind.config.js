/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bookafe-coffee': '#4c3c34',
        'bookafe-latte': '#cbbcb2',
        'bookafe-cream': '#f4eee8',
      },
    },
  },
  plugins: [],
}