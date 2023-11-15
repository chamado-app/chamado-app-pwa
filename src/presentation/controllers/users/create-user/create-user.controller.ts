import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type UserEntity } from '@/domain/entities'
import { type CreateUserUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowUserStore } from '@/presentation/store'

import {
  type CreateUserControllerProps,
  type CreateUserController
} from './types'

export const useCreateUserController = ({
  loadUsers
}: CreateUserControllerProps): CreateUserController => {
  const createUserUsecase = inject<CreateUserUsecase>(
    PROVIDERS.CREATE_USER_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const store = useShowUserStore()

  const onClose = (): void => {
    void router.push({ name: constants.routes.users.list })
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      const { role, ...form } = store.form
      const data: Partial<UserEntity> = { ...form, roles: [role!] }
      await createUserUsecase.execute(data)
      notifier.success({ message: 'Usuário criado com sucesso' })
      void loadUsers()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  return { store, onClose, onSubmit }
}
