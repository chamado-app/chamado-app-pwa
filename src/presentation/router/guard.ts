import { useWhoAmIState } from '../store'

import {
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type Router
} from 'vue-router'

import { Role } from '@/domain/entities'
import { useWhoAmIUsecase } from '@/main/factories'

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

export const useRouteGuard = (router: Router): void => {
  const whoAmIStore = useWhoAmIState()

  const loadWhoAmI = async (): Promise<void> => {
    if (whoAmIStore.loading) return
    whoAmIStore.$patch({ loading: true })
    const whoAmIUsecase = useWhoAmIUsecase()

    try {
      const data = await whoAmIUsecase.execute()
      whoAmIStore.$patch({ data, loaded: true })
    } catch {
      whoAmIStore.$patch({ hasError: true })
    } finally {
      whoAmIStore.$patch({ loading: false })
    }
  }

  const resetGuards = (next: NavigationGuardNext): void => {
    next({ name: 'auth.login' })
    whoAmIStore.$reset()
  }

  const hasValidAccess = (roles: Role[]): boolean => {
    if (whoAmIStore.hasError) return false
    return roles.some((role) => whoAmIStore.roles.includes(role))
  }

  router.beforeEach(async (to, _, next) => {
    const meta = to.meta as RouteMeta

    if (isOnlyGuestRoute(meta)) {
      isAuthRoute(to) ? next() : next({ name: 'auth.login' })
      whoAmIStore.$reset()
      return
    }

    if (!whoAmIStore.loaded) await loadWhoAmI()

    if (hasValidAccess(meta.roles)) {
      next()
      return
    }

    resetGuards(next)
  })
}
