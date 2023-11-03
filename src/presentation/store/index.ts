import { createPinia } from 'pinia'
import { store } from 'quasar/wrappers'

export * from './auth'
export * from './categories'
export * from './tickets'
export * from './ui'
export * from './users'

export default store(() => {
  const pinia = createPinia()

  return pinia
})
