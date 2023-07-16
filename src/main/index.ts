import { createApp } from 'vue'

import App from './App.vue'
import { setupGlobalComponents } from './setup'

const app = createApp(App)

setupGlobalComponents(app)

app.mount('#app')
