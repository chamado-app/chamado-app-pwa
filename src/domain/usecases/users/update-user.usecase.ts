import { type Usecase } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'

export interface UpdateUserUsecase extends Usecase<UserEntity> {
  execute: (id: string, data: Partial<UserEntity>) => Promise<UserEntity>
}
