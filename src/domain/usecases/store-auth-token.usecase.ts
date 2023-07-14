export interface StoreAuthToken {
  store: (data: StoreAuthToken.Input) => StoreAuthToken.Output
}

export namespace StoreAuthToken {
  export type Input = {
    type: string
    accessToken: string
  }

  export type Output = Promise<void>
}
