import { computed, inject, reactive, ref } from 'vue'
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
  const viewPassword = ref(false)

  const state = reactive<AuthenticateControllerState>({
    form: { email: '', password: '' },
    loading: false
  })

  const passwordFieldType = computed(() =>
    viewPassword.value ? 'text' : 'password'
  )

  const passwordTogglerIcon = computed(
    () => `mdi-${viewPassword.value ? 'eye' : 'eye-off'}`
  )

  const toggleShowingPassword = (): void => {
    viewPassword.value = !viewPassword.value
  }

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

  return {
    state,
    passwordFieldType,
    passwordTogglerIcon,
    authenticate,
    toggleShowingPassword
  }
}
