import { type ComputedRef } from 'vue'

import { type useListUsersStore } from '@/presentation/store'
import { type ComputedPagination } from '@/presentation/types'

export interface ListUsersController {
  store: ReturnType<typeof useListUsersStore>
  pagination: ComputedRef<ComputedPagination>
  loadUsers: () => Promise<void>
}
