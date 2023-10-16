import { AuthenticatedRoles } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const mainRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: 'list-tickets' },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/tickets',
        name: 'list-tickets',
        component: () =>
          import('@/presentation/pages/list-tickets/list-tickets-page.vue'),
        meta: { title: 'Chamados', roles: AuthenticatedRoles }
      },
      {
        path: '/tickets/:id',
        name: 'show-ticket',
        component: () =>
          import('@/presentation/pages/view-ticket/view-ticket-page.vue'),
        meta: { title: 'Visualizar chamado', roles: AuthenticatedRoles }
      }
    ]
  }
]
