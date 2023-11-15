import { type ComputedRef } from 'vue'

export type AuthenticateControllerState = {
  loading: boolean
  form: { email: string; password: string }
}

export interface AuthenticateController {
  state: AuthenticateControllerState
  passwordFieldType: ComputedRef<'text' | 'password'>
  passwordTogglerIcon: ComputedRef<string>
  toggleShowingPassword: () => void
  authenticate: () => Promise<void>
}
