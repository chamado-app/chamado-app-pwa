import { inject } from 'vue'

import { type Notifier } from '@/data/protocols'
import { type DeleteUserUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type DeleteUserController,
  type DeleteUserControllerProps
} from './types'

export const useDeleteUserController = (
  props: DeleteUserControllerProps
): DeleteUserController => {
  const deleteUserUsecase = inject<DeleteUserUsecase>(
    PROVIDERS.DELETE_USER_USECASE
  )!

  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!

  const deleteHandler = async (id: string): Promise<void> => {
    try {
      await deleteUserUsecase.execute(id)
      notifier.success({ message: 'Usuário excluído com sucesso.' })
      void props.loadUsers()
    } catch (error: any) {
      notifier.error({ message: error.message })
    }
  }

  return { deleteHandler }
}
