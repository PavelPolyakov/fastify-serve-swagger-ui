module.exports = {
    rootDir: 'src',
    testMatch: ['**/__tests__/**/*.test.(js)'],
    resetModules: true,
    collectCoverage: false,
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/__fixtures__/',
      '/__tests__/',
      '/(__)?mock(s__)?/',
      '/__jest__/',
      '.?.min.js',
    ],
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'json'],
    testEnvironment: 'node',
  };
  