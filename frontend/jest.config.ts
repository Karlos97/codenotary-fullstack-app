import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['./node_modules/', './dist/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/src/components/templates/$1',
    '^@pages/(.*)$': '<rootDir>/src/components/pages/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@hooks/(.*)$': '<rootDir>/src/helpers/hooks/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: { url: 'https://www.url.com' },
              },
            },
          ],
        },
      },
    ],
  },
};

export default config;
