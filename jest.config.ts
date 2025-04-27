import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/eonet/(.*)$': '<rootDir>/eonet/$1',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
});

export default config
// module.exports = createJestConfig(customJestConfig);