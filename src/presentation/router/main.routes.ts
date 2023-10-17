import { constants } from '@/constants'
import { AuthenticatedRoles } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const mainRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: constants.routes.tickets.list },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/tickets',
        name: constants.routes.tickets.list,
        component: () =>
          import('@/presentation/pages/tickets/list-tickets/list-tickets.vue'),
        meta: { title: 'Chamados', roles: AuthenticatedRoles }
      },
      {
        path: '/tickets/:id',
        name: constants.routes.tickets.show,
        component: () =>
          import('@/presentation/pages/tickets/view-ticket/view-ticket.vue'),
        meta: { title: 'Visualizar chamado', roles: AuthenticatedRoles }
      }
    ]
  }
]
