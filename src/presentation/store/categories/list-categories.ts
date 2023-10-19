import { defineStore } from 'pinia'

import { type CategoryEntity } from '@/domain/entities'

export type ListCategoriesState = {
  data: CategoryEntity[]
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
  total: number
  skip: number
  take: number
}

export const useListCategoriesStore = defineStore('listCategories', {
  state: (): ListCategoriesState => ({
    data: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
    total: 0,
    skip: 0,
    take: 10
  })
})
