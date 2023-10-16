export type AuthenticateControllerState = {
  loading: boolean
  form: { email: string; password: string }
}

export interface AuthenticateController {
  state: AuthenticateControllerState
  authenticate: () => Promise<void>
}
