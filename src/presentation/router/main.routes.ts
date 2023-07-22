import type { RouteRecordRaw } from 'vue-router'

export const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: 'overview' },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '',
        name: 'overview',
        component: () =>
          import('@/presentation/pages/overview/overview-page.vue')
      }
    ]
  }
]
