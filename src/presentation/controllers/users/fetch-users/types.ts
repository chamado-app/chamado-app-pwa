import { type useFetchUsersStore } from '@/presentation/store'

export interface FetchUsersController {
  store: ReturnType<typeof useFetchUsersStore>
  fetchUsers: () => Promise<void>
}
