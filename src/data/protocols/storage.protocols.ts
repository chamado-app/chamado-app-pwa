export interface StorageSetter<T = any, P = any> {
  set: (params: StorageSetter.Props<T, P>) => Promise<void>
}

export namespace StorageSetter {
  export type Props<T = any, P = any> = {
    key: string
    value: T
    options?: P
  }
}
