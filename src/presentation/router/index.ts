import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import { useWhoAmIController } from '@/presentation/controllers'
import { useWhoAmIState } from '@/presentation/store'

import { authRoutes } from './auth.routes'
import { mainRoutes } from './main.routes'
import { type RouteMeta } from './types'
import {
  hasValidAccess,
  isAuthRoute,
  isOnlyGuestRoute,
  resetGuards
} from './utils'

export const routes: RouteRecordRaw[] = [...mainRoutes, ...authRoutes]

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createHistory(process.env.VUE_ROUTER_BASE),
    routes
  })

  const whoami = useWhoAmIController()
  const whoamiState = useWhoAmIState()

  Router.beforeEach(async (to, _, next) => {
    const meta = to.meta as RouteMeta

    if (isOnlyGuestRoute(meta)) {
      isAuthRoute(to) ? next() : next({ name: 'auth.login' })
      whoamiState.$reset()
      return
    }

    if (!whoamiState.loaded) await whoami.load()

    if (hasValidAccess(whoamiState.hasError, whoamiState.roles, meta.roles)) {
      next()
      return
    }

    resetGuards(whoamiState.$reset, next)
  })

  return Router
})
