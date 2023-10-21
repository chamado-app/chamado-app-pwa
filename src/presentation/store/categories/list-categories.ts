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
  }),

  actions: {
    changePage(page: number) {
      this.skip = page === 1 ? 0 : (page - 1) * this.take
    },

    changeTake() {
      this.skip = 0
    }
  },

  getters: {
    pagination: ({ skip, take, total }) => ({
      page: skip === 0 ? 1 : skip / take + 1,
      pages: Math.ceil(total / take)
    })
  }
})
