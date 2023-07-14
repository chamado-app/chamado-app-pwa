import type { StorageSetter } from '@/data/protocols'
import type { StoreAuthToken } from '@/domain/usecases'

export class CookieStoreAuthToken implements StoreAuthToken {
  constructor(
    private readonly key: string,
    private readonly storageSetter: StorageSetter
  ) {}

  async store(data: StoreAuthToken.Input): StoreAuthToken.Output {
    const token = `${data.type} ${data.accessToken}`
    await this.storageSetter.set(this.key, token, { sameSite: 'Lax' })
  }
}
