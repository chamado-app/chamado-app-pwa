import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type LogoutUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import type { LogoutController, LogoutControllerState } from './types'

export const useLogoutController = (): LogoutController => {
  const logoutUsecase = inject<LogoutUsecase>(PROVIDERS.LOGOUT_USECASE)!
  const router = useRouter()

  const state = reactive<LogoutControllerState>({
    loading: false
  })

  const logout = async (): Promise<void> => {
    state.loading = true

    try {
      await logoutUsecase.execute()
    } finally {
      void router.replace({ name: constants.routes.auth.authenticate })
    }
  }

  return { state, logout }
}
