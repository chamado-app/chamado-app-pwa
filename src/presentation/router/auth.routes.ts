import { constants } from '@/constants'
import { Role } from '@/domain/entities'

import { type CustomRouteRecordRaw } from './types'

export const authRoutes: CustomRouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    redirect: { name: constants.routes.auth.authenticate },
    component: () => import('@/presentation/layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: constants.routes.auth.authenticate,
        component: () =>
          import(
            '@/presentation/pages/auth/authenticate/authenticate-page.vue'
          ),
        meta: { title: 'Login', roles: [Role.GUEST] }
      }
    ]
  }
]
