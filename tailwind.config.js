/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn : "fadeIn 0.3s ease-out",
        zoomIn : "zoomIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn:{
          "0%": { "opacity": 0 },
          "100%": {"opacity":1 }
        },
        zoomIn:{
          "0%": { transform:"scale(0.8)", opacity:0 },
          "100%": { transform:"scale(1)", opacity:1 },
        }
      },
    },
  },
  plugins: [require('daisyui') , require('@tailwindcss/line-clamp'),require('tailwind-scrollbar-hide') ],
}

