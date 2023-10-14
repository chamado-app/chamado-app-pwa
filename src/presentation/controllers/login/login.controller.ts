import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useLogin, useNotifier } from '@/main/factories'

import type { LoginController } from './types'

export const useLoginController = (): LoginController => {
  const login = useLogin()
  const notifier = useNotifier()
  const router = useRouter()

  const state = reactive<LoginController.State>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      await login.execute({ ...state.form })
      void router.replace({ name: 'main' })
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      state.loading = false
    }
  }

  return { state, authenticate }
}
