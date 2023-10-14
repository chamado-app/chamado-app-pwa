import type { StorageSetter } from '@/data/protocols'
import type { StoreAuthToken } from '@/domain/usecases'

export class CookieStoreAuthToken implements StoreAuthToken {
  constructor(
    private readonly key: string,
    private readonly storageSetter: StorageSetter
  ) {}

  async store(data: StoreAuthToken.Input): StoreAuthToken.Output {
    await this.storageSetter.set({
      key: this.key,
      value: `${data.type} ${data.accessToken}`,
      options: { sameSite: 'Lax', path: '/' }
    })
  }
}
