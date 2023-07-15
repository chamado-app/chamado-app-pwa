import { type App, defineAsyncComponent } from 'vue'

export const setupGlobalComponents = (app: App): void => {
  app.component(
    'QRow',
    defineAsyncComponent(
      () => import('@/presentation/components/ui/q-row/q-row.vue')
    )
  )

  app.component(
    'QCol',
    defineAsyncComponent(
      () => import('@/presentation/components/ui/q-col/q-col.vue')
    )
  )
}
