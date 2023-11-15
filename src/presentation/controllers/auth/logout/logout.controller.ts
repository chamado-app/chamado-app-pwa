import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type LogoutUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import type { LogoutController, LogoutControllerState } from './types'

const TIME_TO_REDIRECT = 400

export const useLogoutController = (): LogoutController => {
  const logoutUsecase = inject<LogoutUsecase>(PROVIDERS.LOGOUT_USECASE)!
  const router = useRouter()

  const state = reactive<LogoutControllerState>({
    loading: false
  })

  const redirect = (): void => {
    void router.replace({ name: constants.routes.auth.authenticate })
  }

  const logout = async (): Promise<void> => {
    state.loading = true

    try {
      await logoutUsecase.execute()
    } finally {
      setTimeout(redirect, TIME_TO_REDIRECT)
    }
  }

  return { state, logout }
}
