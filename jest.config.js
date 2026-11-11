module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-redux|react-native|@react-navigation|immer|react-native-notifications|@d11|@shopify|rettime|@open-draft|until-async)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest-setup.tsx'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/tests/svg.tsx',
  },
  transform: {
    '^.+\\.(js|mjs|ts|tsx)$': 'babel-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: ['msw'],
  },
};
