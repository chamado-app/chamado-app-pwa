import { type Usecase } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'

export interface FetchUsersUsecase extends Usecase<UserEntity[]> {
  execute: () => Promise<UserEntity[]>
}
