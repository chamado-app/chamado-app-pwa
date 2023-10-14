import { inject, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { type Notifier } from '@/data/protocols'
import { type Login } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import type { LoginController } from './types'

export const useLoginController = (): LoginController => {
  const loginUsecase = inject<Login>(PROVIDERS.LOGIN_USECASE)!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()

  const state = reactive<LoginController.State>({
    form: { email: '', password: '' },
    loading: false
  })

  const authenticate = async (): Promise<void> => {
    state.loading = true

    try {
      await loginUsecase.execute({ ...state.form })
      void router.replace({ name: 'main' })
    } catch (error: any) {
      notifier.error({ message: error.message })
      state.loading = false
    }
  }

  return { state, authenticate }
}
