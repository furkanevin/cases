const nextJest = require('next/jest')
// import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  maxWorkers: 1,
  // forceExit: true,

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each', '@testing-library/jest-dom/extend-expect'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  roots: ['src/'],
  modulePaths: ['<rootDir>/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: ['js', 'json', 'ts', 'jsx', 'tsx', 'node'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.storybook/',
    '<rootDir>/.next/',
    '<rootDir>/out/',
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  transform: {
    '^.+\\.(ts|js)x$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: 'tsconfig.json', isolatedModules: true }
    ]
  },
  coverageProvider: 'v8',
  testMatch: ['**/*.test.ts', '**/*.test.tsx']
  // collectCoverage: true
  // collectCoverageFrom: ['./src/**'],
  // coverageThreshold: {
  //   global: {
  //     lines: 40
  //   }
  // }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
