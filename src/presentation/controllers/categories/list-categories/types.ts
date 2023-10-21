import { type ComputedRef } from 'vue'

import { type useListCategoriesStore } from '@/presentation/store'
import { type ComputedPagination } from '@/presentation/types'

export interface ListCategoriesController {
  store: ReturnType<typeof useListCategoriesStore>
  pagination: ComputedRef<ComputedPagination>
}
