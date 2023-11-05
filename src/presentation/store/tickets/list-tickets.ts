import { defineStore } from 'pinia'

import { type TicketEntity } from '@/domain/entities'

export type ListTicketsState = {
  data: TicketEntity[]
  isLoading: boolean
  isLoaded: boolean
  hasError: boolean
  total: number
  skip: number
  take: number
  search: string
}

export const useListTicketsStore = defineStore('listTickets', {
  state: (): ListTicketsState => ({
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
    pagination: (state) => ({
      page: state.skip === 0 ? 1 : state.skip / state.take + 1,
      pages: Math.ceil(state.total / state.take)
    }),

    noRegisters: (state) => !state.total && !state.isLoading && !state.search,
    noResults: (state) => !state.total && !!state.search,
    isFirstLoading: (state) => state.isLoading && !state.isLoaded
  }
})
