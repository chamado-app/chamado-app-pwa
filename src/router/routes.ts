import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/auth-layout.vue'),
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import('src/pages/login-page.vue')
      }
    ]
  }
]

export default routes
