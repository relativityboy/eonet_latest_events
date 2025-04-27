import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

// Use require(), not import, for JSON
const { compilerOptions } = require('./tsconfig.json');

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
      compilerOptions.paths,
      { prefix: '<rootDir>/' }
  ),
};

export default config;
