import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'

export default boot(({ app }) => {
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
})
