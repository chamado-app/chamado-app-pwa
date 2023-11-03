import { computed } from 'vue'

import { constants } from '@/constants'
import { AuthenticatedRoles } from '@/domain/entities'
import { verifyAuthRoles } from '@/domain/utils'
import { useWhoAmIStore } from '@/presentation/store'

import { type LeftSidebarController, type SidebarItem } from './types'

export const sidebarItems: SidebarItem[] = [
  {
    icon: 'mdi-tag-multiple-outline',
    label: 'Chamados',
    to: { name: constants.routes.tickets.list },
    roles: AuthenticatedRoles
  },
  {
    icon: 'mdi-format-list-bulleted',
    label: 'Áreas',
    to: { name: constants.routes.categories.list },
    roles: AuthenticatedRoles
  },
  {
    icon: 'mdi-account-multiple-outline',
    label: 'Usuários',
    to: { name: constants.routes.users.list },
    roles: AuthenticatedRoles
  }
]

export const useLeftSidebarController = (): LeftSidebarController => {
  const { roles: userRoles } = useWhoAmIStore()
  const allowedSidebarItems = computed(() =>
    sidebarItems.filter(({ roles }) => verifyAuthRoles(roles, userRoles))
  )

  return { sidebarItems: allowedSidebarItems }
}
