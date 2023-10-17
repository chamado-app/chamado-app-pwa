import type { StorageSetter } from '@/data/protocols'
import { type AuthenticateOutputDto } from '@/domain/dto'
import type { StoreAuthTokenUsecase } from '@/domain/usecases'

export class CookieStoreAuthToken implements StoreAuthTokenUsecase {
  constructor(
    private readonly key: string,
    private readonly storageSetter: StorageSetter
  ) {}

  async execute(data: AuthenticateOutputDto): Promise<void> {
    await this.storageSetter.set({
      key: this.key,
      value: `${data.type} ${data.accessToken}`,
      options: { sameSite: 'Lax', path: '/' }
    })
  }
}
