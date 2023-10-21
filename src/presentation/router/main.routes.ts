import { constants } from '@/constants'
import { AuthenticatedRoles } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const mainRoutes: CustomRouteRecordRaw[] = [
  {
    name: constants.routes.home,
    path: '/',
    redirect: { name: constants.routes.tickets.list },
    meta: { title: 'Home', roles: AuthenticatedRoles },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/tickets',
        name: constants.routes.tickets.list,
        component: () =>
          import(
            '@/presentation/pages/tickets/list-tickets/list-tickets-page.vue'
          ),
        meta: { title: 'Chamados', roles: AuthenticatedRoles }
      },
      {
        path: '/tickets/:id',
        name: constants.routes.tickets.show,
        component: () =>
          import(
            '@/presentation/pages/tickets/view-ticket/view-ticket-page.vue'
          ),
        meta: { title: 'Visualizar chamado', roles: AuthenticatedRoles }
      },
      {
        path: '/categories',
        meta: { title: 'Categorias', roles: AuthenticatedRoles },
        children: [
          {
            path: '',
            name: constants.routes.categories.list,
            component: () =>
              import(
                '@/presentation/pages/categories/list-categories/list-categories-page.vue'
              ),
            meta: { title: 'Lista de áreas', roles: AuthenticatedRoles }
          }
        ]
      }
    ]
  }
]
