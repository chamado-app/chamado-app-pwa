import { createApp } from 'vue'

import App from './App.vue'
import { setupGlobalComponents, setupQuasar, setupRouter } from './setup'
import '@/assets/scss/app.scss'

const app = createApp(App)

setupGlobalComponents(app)
setupQuasar(app)
setupRouter(app)

app.mount('#app')
