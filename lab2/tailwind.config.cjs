/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        backgroundImage: {
            'aqua-pink': 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
        },
        colors: {
            'violet': '#594157',
            'dbg': '#726DA8', // the name is 'dark-blue-grey'
            'glaucous': '#7D8CC4',
            'powder-blue-350': '#A0D2DB',
            'powder-blue-250': '#BEE7E8',
        },
    },
  },
  plugins: [],
}
