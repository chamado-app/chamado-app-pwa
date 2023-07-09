export interface Login {
  execute: (props: Login.Input) => Promise<Login.Output>
}

export namespace Login {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    type: string
    accessToken: string
  }
}
