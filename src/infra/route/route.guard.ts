import {
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type Router
} from 'vue-router'

import { constants } from '@/constants'
import { Role } from '@/domain/entities'
import { type WhoAmIUsecase } from '@/domain/usecases'
import { verifyAuthRoles } from '@/domain/utils'
import { type RouteMeta, authRoutes } from '@/presentation/router'
import { useWhoAmIStore } from '@/presentation/store'

export const isOnlyGuestRoute = (meta: RouteMeta): boolean => {
  if (!meta.roles?.length) return true
  return meta.roles.length === 1 && meta.roles[0] === Role.GUEST
}

export const isAuthRoute = (to: RouteLocationNormalized): boolean => {
  return authRoutes.some((route) =>
    route.children?.some((child) => child.name === to.name)
  )
}

export const useRouteGuard = (
  router: Router,
  whoAmIUsecase: WhoAmIUsecase
): void => {
  const authRoute = constants.routes.auth.authenticate
  const whoAmIStore = useWhoAmIStore()

  const loadWhoAmI = async (): Promise<void> => {
    if (whoAmIStore.loading) return
    whoAmIStore.$patch({ loading: true })

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
    next({ name: authRoute })
    whoAmIStore.$reset()
  }

  const hasValidAccess = (roles: Role[]): boolean => {
    if (whoAmIStore.hasError) return false
    return verifyAuthRoles(roles, whoAmIStore.roles)
  }

  const setTitle = (title: string): void => {
    window.document.title = `${constants.keys.productName} | ${title}`
  }

  router.beforeEach(async (to, _, next) => {
    const meta = to.meta as RouteMeta
    setTitle(meta.title)

    if (isOnlyGuestRoute(meta)) {
      isAuthRoute(to) ? next() : next({ name: authRoute })
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
