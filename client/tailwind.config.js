module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'slide-in-bottom': {
          from: {
            opacity: '0',
            transform: 'translateY(1000px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'slide-out-bottom': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(1000px)',
          },
        },
      },
      animation: {
        'slide-in-bottom': 'slide-in-bottom 0.75s both',
        'slide-out-bottom': 'slide-out-bottom 0.75s both',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
