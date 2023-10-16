export interface AuthenticateController {
  state: AuthenticateController.State
  authenticate: AuthenticateController.Authenticate
}

export namespace AuthenticateController {
  export type State = {
    loading: boolean
    form: { email: string; password: string }
  }

  export type Authenticate = () => Promise<void>
}
