module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '@testing-library/jest-native/extend-expect',
  ],
  testMatch: ['**/tests/**/*.test.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
      + '|@react-native'
      + '|react-native-vector-icons'
      + '|react-native-reanimated'
      + '|@react-navigation'
      + '|@tanstack/react-query'
      + ')/)',
  ],
};
