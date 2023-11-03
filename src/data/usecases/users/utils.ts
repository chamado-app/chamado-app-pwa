import { type UserEntity } from '@/domain/entities'

import { type RemoteUserEntity } from './types'

export const parseRemoteUserEntityToUserEntity = ({
  createdAt,
  updatedAt,
  ...user
}: RemoteUserEntity): UserEntity => ({
  ...user,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt)
})
