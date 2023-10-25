import { type Role } from '@/domain/entities'

export const verifyAuthRoles = (roles: Role[], userRoles: Role[]): boolean =>
  roles.some((role) => userRoles.includes(role))
