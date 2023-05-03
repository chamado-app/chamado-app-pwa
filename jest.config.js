module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,vue}',
    '!**/*.d.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/App.vue',
    '!<rootDir>/src/assets/*.*',
    '!<rootDir>/src/boot/*.*',
    '!<rootDir>/src/layouts/*.*',
    '!<rootDir>/src/router/*.*',
    '!<rootDir>/src/store/*.*'
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
