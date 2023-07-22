import type { RouteRecordRaw } from 'vue-router'

export const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: 'task-list', params: { taskStatus: 'in-progress' } },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/task-list/:taskStatus',
        name: 'task-list',
        component: () =>
          import('@/presentation/pages/task-list/task-list-page.vue')
      }
    ]
  }
]
