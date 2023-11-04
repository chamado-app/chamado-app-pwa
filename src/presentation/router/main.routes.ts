import { constants } from '@/constants'
import { AuthenticatedRoles } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const mainRoutes: CustomRouteRecordRaw[] = [
  {
    name: constants.routes.home,
    path: '/',
    redirect: { name: constants.routes.tickets.list },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/tickets',
        children: [
          {
            path: '',
            name: constants.routes.tickets.list,
            component: () =>
              import(
                '@/presentation/pages/tickets/list-tickets/list-tickets-page.vue'
              ),
            meta: { title: 'Chamados', roles: AuthenticatedRoles },
            children: [
              {
                path: ':id',
                name: constants.routes.tickets.show,
                component: () =>
                  import(
                    '@/presentation/pages/tickets/view-ticket/view-ticket-page.vue'
                  ),
                meta: { title: 'Visualizar chamado', roles: AuthenticatedRoles }
              }
            ]
          }
        ]
      },
      {
        path: '/areas',
        children: [
          {
            path: '',
            name: constants.routes.categories.list,
            component: () =>
              import(
                '@/presentation/pages/categories/list-categories/list-categories-page.vue'
              ),
            meta: { title: 'Lista de Áreas', roles: AuthenticatedRoles },
            children: [
              {
                path: 'create',
                name: constants.routes.categories.create,
                component: () =>
                  import(
                    '@/presentation/pages/categories/create-category/create-category-page.vue'
                  ),
                meta: { title: 'Nova área', roles: AuthenticatedRoles }
              },
              {
                path: ':id',
                name: constants.routes.categories.show,
                component: () =>
                  import(
                    '@/presentation/pages/categories/update-category/update-category-page.vue'
                  ),
                meta: { title: 'Editar área', roles: AuthenticatedRoles }
              }
            ]
          }
        ]
      },
      {
        path: '/users',
        children: [
          {
            path: '',
            name: constants.routes.users.list,
            component: () =>
              import(
                '@/presentation/pages/users/list-users/list-users-page.vue'
              ),
            meta: { title: 'Usuários', roles: AuthenticatedRoles },
            children: [
              {
                path: 'create',
                name: constants.routes.users.create,
                component: () =>
                  import(
                    '@/presentation/pages/users/create-user/create-user-page.vue'
                  ),
                meta: { title: 'Criar usuário', roles: AuthenticatedRoles }
              },
              {
                path: ':id',
                name: constants.routes.users.show,
                component: () =>
                  import(
                    '@/presentation/pages/users/create-user/create-user-page.vue'
                  ),
                meta: { title: 'Editar usuário', roles: AuthenticatedRoles }
              }
            ]
          }
        ]
      }
    ]
  }
]
