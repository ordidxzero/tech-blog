module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'gray-750': '#24292E',
    }),
    extend: {
      spacing: {
        344: '1376px',
        432: '1728px',
        '1/4': '25%',
        'full-8': 'calc(100% - 2rem)',
        'full-20': 'calc(100% - 5rem)',
        'screen-16': 'calc(100vh - 4rem)',
        'screen-26': 'calc(100vh - 6.5rem)',
        'screen-28': 'calc(100vh - 7rem)',
      },
      maxWidth: {
        344: '1376px',
        432: '1728px',
      },
      minWidth: {
        76: '304px',
      },
      screens: {
        xs: '340px',
        '3xl': '1920px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
