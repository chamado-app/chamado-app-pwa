import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
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
        'src/{__mocks__,__helpers__}',
        'src/**/{types,index}.ts',
        'src/App.vue',
        'src/boot/**',
        'src/domain/errors/**',
        'src/presentation/{router,stores,assets,layouts}/**'
      ]
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/css/quasar-variables.scss'
    }),
    tsconfigPaths()
  ] as any[]
})
