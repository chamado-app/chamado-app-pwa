import { type CategoryEntity } from './category.entity'

export enum Role {
  MANAGER = 'manager',
  TECHNICIAN = 'technician',
  USER = 'user',
  GUEST = 'guest'
}

export const AuthenticatedRoles: Role[] = [
  Role.MANAGER,
  Role.TECHNICIAN,
  Role.USER
]

export const OperationalRoles: Role[] = [Role.MANAGER, Role.TECHNICIAN]

export interface UserEntity {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  password: string | null
  roles: Role[]
  sectors: CategoryEntity[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
