module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,vue}',
    '!<rootDir>/src/**/assets/*.*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/config/jest.setup.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.sass$': 'identity-obj-proxy'
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
}
