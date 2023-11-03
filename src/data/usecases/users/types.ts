import { type UserEntity } from '@/domain/entities'

export type RemoteUserEntity = Omit<UserEntity, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
