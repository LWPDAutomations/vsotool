module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'nab-orange': '#ff6c00',
          'nab-orange-dark': '#e55f00',
          'nab-blue': '#003b5c',
          'nab-gray': '#f5f5f5',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }