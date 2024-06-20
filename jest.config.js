module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-redux|react-native|@react-navigation)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
