import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-mdi-v7'
import quasarLang from 'quasar/lang/pt-BR'

import type { App } from 'vue'
// A few examples for animations from Animate.css:
// import '@quasar/extras/animate/zoomIn.css'
// import '@quasar/extras/animate/zoomOut.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import '@quasar/extras/mdi-v7/mdi-v7.css'

export const setupQuasar = (app: App): void => {
  app.use(Quasar, {
    plugins: {},
    lang: quasarLang,
    iconSet: quasarIconSet
  })
}
