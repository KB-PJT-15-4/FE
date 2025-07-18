/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
      },
      colors: {
        'moa-main': '#87BFFF',
        'moa-disabled': '#CCCCCC',
        'moa-error': '#DB0000',
        'moa-success': '#009F2C',
        'moa-main-text': '#3E3E3E',
        'moa-sub-text': '#949494',
      },
    },
  },
  plugins: [],
}
