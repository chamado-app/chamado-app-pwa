import { type ListUsersOutputDto } from '@/domain/dto'

import { type RemoteUserEntity } from '../types'

export type RemoteListUsersDto = Omit<ListUsersOutputDto, 'users'> & {
  users: RemoteUserEntity[]
}
