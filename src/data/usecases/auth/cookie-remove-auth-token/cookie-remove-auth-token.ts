import type { StorageRemover } from '@/data/protocols'
import type { RemoveAuthTokenUsecase } from '@/domain/usecases'

export class CookieRemoveAuthToken implements RemoveAuthTokenUsecase {
  constructor(
    private readonly key: string,
    private readonly storageRemover: StorageRemover
  ) {}

  async execute(): Promise<void> {
    await this.storageRemover.remove({
      key: this.key,
      options: { path: '/' }
    })
  }
}
