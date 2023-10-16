export interface Usecase<T> {
  execute: (...args: any[]) => Promise<T>
}
