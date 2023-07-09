import { reactive } from 'vue'

import { makeLogin } from '@/main/factories/usecases'

import type { LoginController } from './types'

export const useLoginController = (): LoginController => {
  const login = makeLogin()

  const state = reactive<LoginController.State>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      await login.execute({ ...state.form })
    } catch (error) {
    } finally {
      state.loading = false
    }
  }

  return { state, authenticate }
}
