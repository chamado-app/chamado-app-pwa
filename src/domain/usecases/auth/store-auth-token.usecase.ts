import { type Usecase } from '@/domain/base'
import { type AuthenticateOutputDto } from '@/domain/dto'

export interface StoreAuthTokenUsecase extends Usecase<void> {
  execute: (data: AuthenticateOutputDto) => Promise<void>
}
