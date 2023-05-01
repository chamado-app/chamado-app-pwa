import { type RenderOptions as TestingLibraryRenderOptions } from '@testing-library/vue'

export type RenderOptions<P> = TestingLibraryRenderOptions & {
  props?: P
}
