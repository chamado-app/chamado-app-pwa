import { type ListUsersController } from '@/presentation/controllers'

export type DeleteUserControllerProps = {
  loadUsers: ListUsersController['loadUsers']
}

export interface DeleteUserController {
  deleteHandler: (id: string) => Promise<void>
}
