/**
 * Jest configuration in CommonJS to avoid needing ts-node.
 */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/tests/**/*.(spec|test).ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@angular/core$': '<rootDir>/test-stubs/angular-core.ts',
    '^@angular/router$': '<rootDir>/test-stubs/angular-router.ts',
    '^@nativescript/angular$': '<rootDir>/test-stubs/nativescript-angular.ts'
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json', isolatedModules: true }],
    // Transform Angular ESM .mjs bundles via babel-jest
    '^.+\\.mjs$': ['babel-jest', { presets: ['@babel/preset-env'] }]
  },
  transformIgnorePatterns: [
    // Allow transforming angular & nativescript ESM bundles
    'node_modules/(?!@angular/|@nativescript/)'
  ],
  collectCoverageFrom: [
    'src/lib/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    },
    './src/lib/': {
      branches: 90,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
