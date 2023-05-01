import { boot } from 'quasar/wrappers'

import { QCol, QRow } from '@/components'

export default boot(({ app }) => {
  app.component('QCol', QCol)
  app.component('QRow', QRow)
})
