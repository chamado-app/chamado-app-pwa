export type StorageSetterProps<T = any, P = any> = {
  key: string
  value: T
  options?: P
}

export interface StorageSetter<T = any, P = any> {
  set: (params: StorageSetterProps<T, P>) => Promise<void>
}

export type StorageGuetterProps = {
  key: string
}

export interface StorageGuetter<T = any> {
  get: (params: StorageGuetterProps) => Promise<T>
}
