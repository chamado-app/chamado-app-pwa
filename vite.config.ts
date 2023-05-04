import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { URL, fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/assets/scss/quasar-variables.scss'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    setupFiles: ['src/test-utils/setup/vitest.ts'],
    coverage: {
      provider: 'istanbul',
      all: true,
      cleanOnRerun: true,
      statements: 90,
      branches: 90,
      reporter: ['text', 'html'],
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
