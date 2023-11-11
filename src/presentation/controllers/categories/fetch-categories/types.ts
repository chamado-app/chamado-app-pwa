import { type useFetchCategoriesStore } from '@/presentation/store'

export interface FetchCategoriesController {
  store: ReturnType<typeof useFetchCategoriesStore>
  fetchCategories: () => Promise<void>
}
