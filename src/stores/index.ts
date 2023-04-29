import { createPinia } from 'pinia'
import { store } from 'quasar/wrappers'

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()
  return pinia
})
