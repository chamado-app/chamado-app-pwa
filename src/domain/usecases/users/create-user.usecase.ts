import { type Usecase } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'

export interface CreateUserUsecase extends Usecase<UserEntity> {
  execute: (data: Partial<UserEntity>) => Promise<UserEntity>
}
