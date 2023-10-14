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

export interface WhoAmIEntity {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: Role[]
}
