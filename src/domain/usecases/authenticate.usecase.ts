export interface AuthenticateUsecase {
  execute: (
    props: AuthenticateUsecase.Input
  ) => Promise<AuthenticateUsecase.Output>
}

export namespace AuthenticateUsecase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    type: string
    accessToken: string
  }
}
