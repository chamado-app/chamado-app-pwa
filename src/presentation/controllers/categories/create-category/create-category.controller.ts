import { inject } from 'vue'
import { useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import { type CreateCategoryUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowCategoryStore } from '@/presentation/store'

import {
  type CreateCategoryControllerProps,
  type CreateCategoryController
} from './types'

export const useCreateCategoryController = ({
  loadCategories
}: CreateCategoryControllerProps): CreateCategoryController => {
  const createCategoryUsecase = inject<CreateCategoryUsecase>(
    PROVIDERS.CREATE_CATEGORY_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const store = useShowCategoryStore()

  const onClose = (): void => {
    void router.push({ name: constants.routes.categories.list })
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      await createCategoryUsecase.execute(store.form)
      notifier.success({ message: 'Área criada com sucesso' })
      void loadCategories()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  return { store, onClose, onSubmit }
}
