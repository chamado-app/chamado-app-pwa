import {
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

import { Role } from '@/domain/entities'

import { authRoutes } from './auth.routes'
import { type RouteMeta } from './types'

export const isOnlyGuestRoute = (meta: RouteMeta): boolean => {
  if (!meta.roles?.length) return true
  return meta.roles.length === 1 && meta.roles[0] === Role.GUEST
}

export const isAuthRoute = (to: RouteLocationNormalized): boolean => {
  return authRoutes.some((route) =>
    route.children?.some((child) => child.name === to.name)
  )
}

export const hasValidAccess = (
  hasError: boolean,
  userRoles: Role[],
  roles: Role[]
): boolean => {
  if (hasError) return false
  return roles.some((role) => userRoles.includes(role))
}

export const resetGuards = (
  reset: () => void,
  next: NavigationGuardNext
): void => {
  next({ name: 'auth.login' })
  reset()
}
