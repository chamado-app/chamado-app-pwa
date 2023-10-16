import type { StorageSetter } from '@/data/protocols'
import type { StoreAuthTokenUsecase } from '@/domain/usecases'

export class CookieStoreAuthToken implements StoreAuthTokenUsecase {
  constructor(
    private readonly key: string,
    private readonly storageSetter: StorageSetter
  ) {}

  async store(data: StoreAuthTokenUsecase.Input): StoreAuthTokenUsecase.Output {
    await this.storageSetter.set({
      key: this.key,
      value: `${data.type} ${data.accessToken}`,
      options: { sameSite: 'Lax', path: '/' }
    })
  }
}
