import { defineStore } from 'pinia'

import { type CategoryEntity } from '@/domain/entities'

export type FetchCategoriesStore = {
  categories: CategoryEntity[]
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
}

export const useFetchCategoriesStore = defineStore('fetchCategories', {
  state: (): FetchCategoriesStore => ({
    categories: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
  })
})
