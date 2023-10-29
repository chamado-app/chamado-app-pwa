import { computed, inject, watch } from 'vue'

import { type ListCategoriesUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListCategoriesStore } from '@/presentation/store'
import { useScrollToTop } from '@/presentation/utils'

import { type ListCategoriesController } from './types'

export const useListCategoriesController = (): ListCategoriesController => {
  const store = useListCategoriesStore()
  const listCategoriesUsecase = inject<ListCategoriesUsecase>(
    PROVIDERS.LIST_CATEGORIES_USECASE
  )!

  const loadCategories = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const { skip, take, search } = store
      const result = await listCategoriesUsecase.execute({ skip, take, search })
      const { categories: data, total } = result
      store.$patch({ data, total, isLoaded: true })
    } catch (error) {
      store.$patch({ hasError: true, total: 0 })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  const pagination = computed(() => ({
    ...store.pagination,
    page: 1,
    rowsPerPage: store.take,
    rowsNumber: store.total
  }))

  watch(() => store.skip, loadCategories)
  watch(() => store.take, loadCategories)
  watch(() => store.isLoading, useScrollToTop())
  watch(
    () => store.search,
    (value) => {
      if (value && value.length < 3) return
      void loadCategories()
    }
  )

  return { pagination, store, loadCategories }
}
