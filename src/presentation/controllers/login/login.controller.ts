import { reactive } from 'vue'

import { makeLogin, makeStoreAuthToken } from '@/main/factories/usecases'

import type { LoginController } from './types'

export const useLoginController = (): LoginController => {
  const login = makeLogin()
  const storeAuthToken = makeStoreAuthToken()

  const state = reactive<LoginController.State>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      const data = await login.execute({ ...state.form })
      await storeAuthToken.store({ ...data })
    } catch (error) {
    } finally {
      state.loading = false
    }
  }

  return { state, authenticate }
}
