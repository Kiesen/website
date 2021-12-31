module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: '1.2s ease fadeIn',
        glitch: '5s ease 5s infinite alternate glitch',
      },
      backgroundImage: {
        'body-image': "url('/images/background.png')",
      },
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      scale: ['group-hover'],
    },
  },
  plugins: [],
};
