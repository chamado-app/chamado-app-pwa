import type { RouteRecordRaw } from 'vue-router'

export const mainRoutes: RouteRecordRaw[] = [
  { path: '/', redirect: { name: 'auth' } }
]
