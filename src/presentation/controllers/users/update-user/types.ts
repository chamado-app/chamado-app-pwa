import { type ComputedRef } from 'vue'

import { type ListUsersController } from '@/presentation/controllers'
import { type useShowUserStore } from '@/presentation/store'

export type UpdateUserControllerProps = {
  loadUsers: ListUsersController['loadUsers']
}

export interface UpdateUserController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowUserStore>
  userId: ComputedRef<string>
}
