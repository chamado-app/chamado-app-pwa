import { type ListUsersController } from '@/presentation/controllers'
import { type useShowUserStore } from '@/presentation/store'

export type CreateUserControllerProps = {
  loadUsers: ListUsersController['loadUsers']
}

export interface CreateUserController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowUserStore>
}
