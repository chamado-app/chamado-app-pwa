import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { makeLogin, makeNotifier, makeStoreAuthToken } from '@/main/factories'

import type { LoginController } from './types'

export const useLoginController = (): LoginController => {
  const login = makeLogin()
  const storeAuthToken = makeStoreAuthToken()
  const notifier = makeNotifier()
  const router = useRouter()

  const state = reactive<LoginController.State>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      const data = await login.execute({ ...state.form })
      await storeAuthToken.store({ ...data })
      void router.replace({ name: 'home' })
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.loading = false
    }
  }

  return { state, authenticate }
}
