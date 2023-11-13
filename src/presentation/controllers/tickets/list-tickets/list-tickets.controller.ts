import { computed, inject, watch } from 'vue'

import { type ListTicketsUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListTicketsStore } from '@/presentation/store'
import { useScrollToTop } from '@/presentation/utils'

import { type ListTicketsController } from './types'

export const useListTicketsController = (): ListTicketsController => {
  const store = useListTicketsStore()
  const listTicketsUsecase = inject<ListTicketsUsecase>(
    PROVIDERS.LIST_TICKETS_USECASE
  )!

  const loadTickets = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const { skip, take, search } = store
      const result = await listTicketsUsecase.execute({ skip, take, search })
      const { tickets: data, total } = result
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

  watch(() => store.skip, loadTickets)
  watch(() => store.take, loadTickets)
  watch(() => store.isLoading, useScrollToTop())
  watch(
    () => store.search,
    (value) => {
      if (value && value.length < 3) return
      void loadTickets()
    }
  )

  return { pagination, store, loadTickets }
}
