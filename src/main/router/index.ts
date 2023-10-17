import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import { useRouteGuard } from '@/infra'
import { useWhoAmIUsecase } from '@/main/factories'
import { authRoutes, mainRoutes } from '@/presentation/router'

export default route(function () {
  const routes: RouteRecordRaw[] = [...mainRoutes, ...authRoutes]

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

  useRouteGuard(Router, useWhoAmIUsecase())

  return Router
})
