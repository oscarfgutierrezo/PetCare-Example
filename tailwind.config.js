/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './medicalRecords.html', './public/js/medicalRecords/ui.js', './public/js/formPatients/ui.js'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        "sans": "DM Sans"
      },
      colors: {
        "green": "#00b55e",
        "blue": "#007cc1",
        "dark-blue": "#0368a1",
      },
    },
  },
  plugins: [],
}
