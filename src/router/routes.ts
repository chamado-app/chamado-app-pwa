import type { RouteRecordRaw } from 'vue-router'

import { authRoutes } from './auth.routes'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'auth' } },
  ...authRoutes
]

export default routes
