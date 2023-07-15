export interface StorageSetter<T = any, P = any> {
  set: (key: string, value: T, options?: P) => Promise<void>
}
