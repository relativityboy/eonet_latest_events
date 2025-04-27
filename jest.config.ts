import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
});

export default config
// module.exports = createJestConfig(customJestConfig);