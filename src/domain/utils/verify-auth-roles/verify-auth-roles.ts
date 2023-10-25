import { type Role } from '@/domain/entities'

export const verifyAuthRoles = (roles: Role[], userRoles: Role[]): boolean => {
  return roles.some((role) => userRoles.includes(role))
}
