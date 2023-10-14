import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import { authRoutes, mainRoutes } from '@/presentation/router'

import { useRouteGuard } from './route.guard'

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

  useRouteGuard(Router)

  return Router
})
