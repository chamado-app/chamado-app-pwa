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
  search: string
}

export const useListCategoriesStore = defineStore('listCategories', {
  state: (): ListCategoriesState => ({
    data: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
    total: 0,
    skip: 0,
    take: 10,
    search: ''
  }),

  actions: {
    changePage(page: number) {
      this.skip = page === 1 ? 0 : (page - 1) * this.take
    },

    changeTake(take: number) {
      this.skip = 0
      this.take = take
    },

    changeSearch(search: string) {
      this.search = search
      this.changePage(1)
    }
  },

  getters: {
    pagination: (store) => ({
      page: store.skip === 0 ? 1 : store.skip / store.take + 1,
      pages: Math.ceil(store.total / store.take)
    })
  }
})
