import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    redirect: '/coming-soon',
    children: [
      {
        path: '/coming-soon',
        component: () => import('src/pages/coming-soon.vue')
      }
    ]
  }
]

export default routes
