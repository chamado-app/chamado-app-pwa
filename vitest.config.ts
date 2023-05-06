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
      setupFiles: ['src/test-utils/setup/vitest.ts'],
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
          'src/**/{router,stores,assets,layouts,setup,test-utils}/**',
          'src/**/{types,index}.ts',
          'src/App.vue',
          'src/main.ts'
        ]
      }
    }
  })
)
