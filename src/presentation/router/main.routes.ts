import { AuthenticatedRoles } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const mainRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: 'ticket-list', params: { ticketStatus: 'in-progress' } },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/ticket-list/:ticketStatus',
        name: 'ticket-list',
        component: () =>
          import('@/presentation/pages/ticket-list/ticket-list-page.vue'),
        meta: { title: 'Chamados', roles: AuthenticatedRoles }
      },
      {
        path: '/ticket/:id',
        name: 'ticket-info',
        component: () =>
          import('@/presentation/pages/ticket-info/ticket-info-page.vue'),
        meta: { title: 'Detalhes do chamado', roles: AuthenticatedRoles }
      }
    ]
  }
]
