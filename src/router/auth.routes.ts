import { type RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    name: 'auth',
    path: '/auth',
    redirect: { name: 'auth.login' },
    component: () => import('layouts/auth-layout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('pages/login/login-page.vue')
      }
    ]
  }
]
