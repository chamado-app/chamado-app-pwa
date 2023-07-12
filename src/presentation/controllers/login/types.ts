export interface LoginController {
  state: LoginController.State
  authenticate: LoginController.Authenticate
}

export namespace LoginController {
  export type State = {
    loading: boolean
    form: { email: string; password: string }
  }

  export type Authenticate = () => Promise<void>
}
