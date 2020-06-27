module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/build/',
    '!<rootDir>/*.js'
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json',
      packageJson: 'package.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/config.*.js']
};
