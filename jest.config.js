module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  moduleNameMapper: {
    'react-interactable/noNative': 'react-interactable/dist/interactable.noNative',
    '.(scss|css|less)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./tests/setupTestsAfterEnv.js'],
  testMatch: ['**/src/__tests__/**/*.test.js?(x)'],
  verbose: true
};
