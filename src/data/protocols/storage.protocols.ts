export type StorageSetterProps<T = any, P = any> = {
  key: string
  value: T
  options?: P
}

export interface StorageSetter<T = any, P = any> {
  set: (params: StorageSetterProps<T, P>) => Promise<void>
}

export type StorageRemoverProps<T = any> = {
  key: string
  options?: T
}

export interface StorageRemover<T = any> {
  remove: (params: StorageRemoverProps<T>) => Promise<void>
}

export type StorageGuetterProps = {
  key: string
}

export interface StorageGuetter<T = any> {
  get: (params: StorageGuetterProps) => Promise<T>
}
