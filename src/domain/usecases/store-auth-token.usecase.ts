export interface StoreAuthTokenUsecase {
  store: (data: StoreAuthTokenUsecase.Input) => StoreAuthTokenUsecase.Output
}

export namespace StoreAuthTokenUsecase {
  export type Input = {
    type: string
    accessToken: string
  }

  export type Output = Promise<void>
}
