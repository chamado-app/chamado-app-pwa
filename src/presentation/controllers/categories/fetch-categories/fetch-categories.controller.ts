import { inject, onMounted } from 'vue'

import { type FetchCategoriesUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useFetchCategoriesStore } from '@/presentation/store'

import { type FetchCategoriesController } from './types'

export const useFetchCategoriesController = (): FetchCategoriesController => {
  const store = useFetchCategoriesStore()
  const fetchCategoriesUsecase = inject<FetchCategoriesUsecase>(
    PROVIDERS.FETCH_CATEGORIES_USECASE
  )!

  const fetchCategories = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const categories = await fetchCategoriesUsecase.execute()
      store.$patch({ categories })
    } catch (error) {
      store.$patch({ hasError: true })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  onMounted(fetchCategories)

  return { store, fetchCategories }
}
