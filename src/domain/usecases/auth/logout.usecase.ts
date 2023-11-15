import { type Usecase } from '@/domain/base'

export interface LogoutUsecase extends Usecase<void> {
  execute: () => Promise<void>
}
