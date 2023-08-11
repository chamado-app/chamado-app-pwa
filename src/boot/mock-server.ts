import { boot } from 'quasar/wrappers'

import { mockServer } from '@/__mocks__/api'

export default boot(() => {
  if (import.meta.env.DEV) mockServer()
})
