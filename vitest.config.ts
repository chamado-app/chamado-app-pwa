import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

import { resolve } from 'path'

// https://vitest.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: resolve(__dirname),
    globals: true,
    setupFiles: ['vitest.setup.ts'],
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      all: true,
      cleanOnRerun: true,
      statements: 0,
      branches: 0,
      reporter: ['text', 'lcov', 'html-spa'],
      include: ['src/**/*.{vue,ts}'],
      exclude: [
        '**/*.{d,spec}.ts',
        '**/constants/**',
        '**/protocols/**',
        'src/{__mocks__,__helpers__}',
        'src/**/{types,index}.ts',
        'src/App.vue',
        'src/boot/**',
        'src/domain/errors/**',
        'src/presentation/{assets,factories,layouts,pages,router,stores}/**'
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
