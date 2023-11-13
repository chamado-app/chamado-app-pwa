import { inject, onMounted } from 'vue'

import { type FetchUsersUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useFetchUsersStore } from '@/presentation/store'

import { type FetchUsersController } from './types'

export const useFetchUsersController = (): FetchUsersController => {
  const store = useFetchUsersStore()
  const fetchUsersUsecase = inject<FetchUsersUsecase>(
    PROVIDERS.FETCH_USERS_USECASE
  )!

  const fetchUsers = async (): Promise<void> => {
    if (store.isLoading) return

    store.$patch({ isLoading: true })

    try {
      const users = await fetchUsersUsecase.execute()
      store.$patch({ users })
    } catch (error) {
      store.$patch({ hasError: true })
    } finally {
      store.$patch({ isLoading: false })
    }
  }

  onMounted(fetchUsers)

  return { store, fetchUsers }
}
