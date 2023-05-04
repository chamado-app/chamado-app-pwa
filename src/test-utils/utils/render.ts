import {
  type RenderOptions,
  type RenderResult,
  render
} from '@testing-library/vue'
import { Quasar, extend } from 'quasar'

import { QCol, QRow } from '@/components'

export { type RenderResult, render } from '@testing-library/vue'

export const renderWithQuasar = (
  testComponent: any,
  options: RenderOptions = {}
): RenderResult => {
  const fixedOptions: RenderOptions = {
    global: { plugins: [Quasar], components: { QCol, QRow } }
  }

  return render(testComponent, extend(true, fixedOptions, options))
}
