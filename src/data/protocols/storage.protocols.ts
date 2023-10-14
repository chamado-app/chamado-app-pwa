export interface StorageSetter<T = any, P = any> {
  set: (params: StorageSetter.Props<T, P>) => Promise<void>
}

export interface StorageGuetter<T = any> {
  get: (params: StorageGuetter.Props) => StorageGuetter.Result<T>
}

export namespace StorageSetter {
  export type Props<T = any, P = any> = {
    key: string
    value: T
    options?: P
  }
}

export namespace StorageGuetter {
  export type Props = {
    key: string
  }

  export type Result<T = any> = Promise<T>
}
