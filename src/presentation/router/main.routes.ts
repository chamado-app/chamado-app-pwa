import type { RouteRecordRaw } from 'vue-router'

export const mainRoutes: RouteRecordRaw[] = [
  {
    name: 'main',
    path: '/',
    redirect: { name: 'ticket-list', params: { ticketStatus: 'in-progress' } },
    component: () => import('@/presentation/layouts/main-layout.vue'),
    children: [
      {
        path: '/ticket-list/:ticketStatus',
        name: 'ticket-list',
        component: () =>
          import('@/presentation/pages/ticket-list/ticket-list-page.vue')
      },
      {
        path: '/ticket/:id',
        name: 'ticket-info',
        component: () =>
          import('@/presentation/pages/ticket-info/ticket-info-page.vue')
      }
    ]
  }
]
