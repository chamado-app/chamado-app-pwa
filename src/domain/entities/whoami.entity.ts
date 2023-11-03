import { type UserEntity } from './user.entity'

export interface WhoAmIEntity {
  id: UserEntity['id']
  email: UserEntity['email']
  firstName: UserEntity['firstName']
  lastName: UserEntity['lastName']
  roles: UserEntity['roles']
}
