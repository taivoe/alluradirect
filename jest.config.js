// Source: https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript
module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['src/'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // "@testing-library/react/cleanup-after-each",
    '@testing-library/jest-dom/extend-expect',
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['__tests__/helpers.ts'],

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  // moduleNameMapper: {
  //   '@alluradirect/api/(.*)': '<rootDir>/src/api/$1',
  //   '@alluradirect/business/(.*)': '<rootDir>/src/business/$1',
  //   '@alluradirect/customReact/(.*)': '<rootDir>/src/customReact/$1',
  // },

  testEnvironment: 'jsdom',
};
