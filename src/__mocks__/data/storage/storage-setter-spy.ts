import { type StorageSetter } from '@/data/protocols'

export class StorageSetterSpy implements StorageSetter {
  key?: string
  value?: string
  options?: any

  set({ key, value, options }: StorageSetter.Props): Promise<void> {
    this.key = key
    this.value = value
    this.options = options
    return Promise.resolve()
  }
}
