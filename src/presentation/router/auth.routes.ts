import { Role } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const authRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    redirect: { name: 'auth.authenticate' },
    component: () => import('@/presentation/layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.authenticate',
        component: () =>
          import('@/presentation/pages/authenticate/authenticate-page.vue'),
        meta: { title: 'Login', roles: [Role.GUEST] }
      }
    ]
  }
]
