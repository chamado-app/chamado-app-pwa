import { computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type UserEntity } from '@/domain/entities'
import { type ShowUserUsecase, type UpdateUserUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowUserStore } from '@/presentation/store'

import {
  type UpdateUserControllerProps,
  type UpdateUserController
} from './types'

export const useUpdateUserController = ({
  loadUsers
}: UpdateUserControllerProps): UpdateUserController => {
  const updateUserUsecase = inject<UpdateUserUsecase>(
    PROVIDERS.UPDATE_USER_USECASE
  )!
  const showUserUsecase = inject<ShowUserUsecase>(PROVIDERS.SHOW_USER_USECASE)!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const route = useRoute()
  const store = useShowUserStore()
  const userId = computed<string>(() => route.params.id as string)

  const onClose = (): void => {
    void router.push({ name: constants.routes.users.list })
  }

  const loadUser = async (): Promise<void> => {
    if (!userId.value) {
      void router.push({ name: constants.routes.users.list })
      return
    }

    try {
      const { roles, ...user } = await showUserUsecase.execute(userId.value)
      const [role] = roles
      store.$patch({ form: { ...user, role } })
    } catch (error: any) {
      notifier.error({ message: error.message })
      void router.push({ name: constants.routes.users.list })
    }
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      const { role, ...form } = store.form
      const data: Partial<UserEntity> = { ...form, roles: [role!] }
      await updateUserUsecase.execute(userId.value, data)
      notifier.success({ message: 'Usuário atualizado com sucesso' })
      void loadUsers()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  onMounted(loadUser)

  return { store, onClose, onSubmit, userId }
}
