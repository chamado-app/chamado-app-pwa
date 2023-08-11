import { createPinia } from 'pinia'
import { store } from 'quasar/wrappers'

export * from './tickets'
export * from './toggles'

export default store(() => {
  const pinia = createPinia()

  return pinia
})
