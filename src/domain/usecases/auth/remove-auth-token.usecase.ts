import { type Usecase } from '@/domain/base'

export interface RemoveAuthTokenUsecase extends Usecase<void> {
  execute: () => Promise<void>
}
