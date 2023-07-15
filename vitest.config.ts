import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

import { fileURLToPath } from 'node:url'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      setupFiles: ['src/__helpers__/setup/vitest.ts'],
      clearMocks: true,
      coverage: {
        provider: 'istanbul',
        all: true,
        cleanOnRerun: true,
        statements: 90,
        branches: 90,
        reporter: ['text', 'lcov', 'html-spa'],
        include: ['src/**/*.{vue,ts}'],
        exclude: [
          '**/*.{d,spec}.ts',
          'src/**/{types,index}.ts',
          'src/domain/errors/**',
          'src/main/setup/**',
          'src/main/{App.vue,main.ts}',
          'src/presentation/{router,stores,assets,layouts,pages}/**',
          'src/{__mocks__,__helpers__}'
        ]
      }
    }
  })
)
