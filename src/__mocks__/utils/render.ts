import {
  type RenderOptions,
  type RenderResult,
  render as testingLibraryRender
} from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { Quasar, extend } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

import { QCol, QRow } from '@/presentation/components'

export { type RenderResult } from '@testing-library/vue'

const Router = createRouter({
  routes: [{ path: '/blank', component: () => null }],
  history: createWebHistory(process.env.VUE_ROUTER_BASE)
})

export const render = (
  component: any,
  options: RenderOptions = {}
): RenderResult => {
  const fixedOptions: RenderOptions = {
    global: {
      plugins: [Router, Quasar],
      components: { QCol, QRow },
      stubs: { RouterLink: RouterLinkStub }
    }
  }

  return testingLibraryRender(component, extend(true, fixedOptions, options))
}
