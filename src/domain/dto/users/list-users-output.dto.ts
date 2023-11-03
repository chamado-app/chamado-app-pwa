import { type ListOutputDto } from '@/domain/base'
import { type UserEntity } from '@/domain/entities'

export type ListUsersOutputDto = ListOutputDto & {
  users: UserEntity[]
}
