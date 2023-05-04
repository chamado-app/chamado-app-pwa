import type { RouteRecordRaw } from 'vue-router'

import { authRoutes } from './auth.routes'
import { mainRoutes } from './main.routes'

export const routes: RouteRecordRaw[] = [...mainRoutes, ...authRoutes]
