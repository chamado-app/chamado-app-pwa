import { type Router, createRouter, createWebHistory } from 'vue-router'

import type { App } from 'vue'

import { routes } from '@/router'

let router: Router

export const setupRouter = (app: App): Router => {
  router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
    history: createWebHistory(),
    routes
  })

  app.use(router)

  return router
}
