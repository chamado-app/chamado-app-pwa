import { type Usecase } from '@/domain/base'
import { type FetchUsersInputDto } from '@/domain/dto'
import { type UserEntity } from '@/domain/entities'

export interface FetchUsersUsecase extends Usecase<UserEntity[]> {
  execute: (data?: FetchUsersInputDto) => Promise<UserEntity[]>
}
