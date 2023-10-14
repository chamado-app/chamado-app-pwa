import { type RouteRecordRaw } from 'vue-router'

import { type Role } from '@/domain/entities'

export type RouteMeta = {
  title?: string
  roles: Role[]
}

export type CustomRouteRecordRaw = RouteRecordRaw & {
  children?: CustomRouteRecordRaw[]
  meta?: RouteMeta
}
