import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type AuthenticateUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import type {
  AuthenticateController,
  AuthenticateControllerState
} from './types'

export const useAuthenticateController = (): AuthenticateController => {
  const authenticateUsecase = inject<AuthenticateUsecase>(
    PROVIDERS.AUTHENTICATE_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()

  const state = reactive<AuthenticateControllerState>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      await authenticateUsecase.execute({ ...state.form })
      void router.replace({ name: constants.routes.home })
    } catch (error: any) {
      notifier.error({ message: error.message })
      state.loading = false
    }
  }

  return { state, authenticate }
}
