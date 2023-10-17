import { type ComputedRef } from 'vue'

import { type Role } from '@/domain/entities'

export type SidebarItem = {
  to: { name: string; params?: Record<string, string> }
  label: string
  icon: string
  roles: Role[]
}

export type LeftSidebarController = {
  sidebarItems: ComputedRef<SidebarItem[]>
}
