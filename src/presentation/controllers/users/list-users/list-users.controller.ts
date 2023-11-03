import { computed, inject, watch } from 'vue'

import { type ListUsersUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useListUsersStore } from '@/presentation/store'
import { useScrollToTop } from '@/presentation/utils'

import { type ListUsersController } from './types'

export const useListUsersController = (): ListUsersController => {
  const store = useListUsersStore()
  const listUsersUsecase = inject<ListUsersUsecase>(
    PROVIDERS.LIST_USERS_USECASE
  )!

  const loadUsers = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const { skip, take, search } = store
      const result = await listUsersUsecase.execute({ skip, take, search })
      const { users: data, total } = result
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

  watch(() => store.skip, loadUsers)
  watch(() => store.take, loadUsers)
  watch(() => store.isLoading, useScrollToTop())
  watch(
    () => store.search,
    (value) => {
      if (value && value.length < 3) return
      void loadUsers()
    }
  )

  return { pagination, store, loadUsers }
}
