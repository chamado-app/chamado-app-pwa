import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import { URL, fileURLToPath } from 'node:url'

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
  }
})
