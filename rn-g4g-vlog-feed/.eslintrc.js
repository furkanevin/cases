module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.js', '__tests__/**/*.{ts,tsx,js,jsx}'],
      env: { jest: true },
    },
  ],
};
