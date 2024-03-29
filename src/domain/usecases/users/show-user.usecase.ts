import { type Usecase } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'

export interface ShowUserUsecase extends Usecase<UserEntity> {
  execute: (id: string) => Promise<UserEntity>
}
