import { Role } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const authRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    redirect: { name: 'auth.login' },
    component: () => import('@/presentation/layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('@/presentation/pages/login/login-page.vue'),
        meta: { title: 'Login', roles: [Role.GUEST] }
      }
    ]
  }
]
