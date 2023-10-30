import { computed, inject, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { constants } from '@/constants'
import { type Notifier } from '@/data/protocols'
import {
  type ShowCategoryUsecase,
  type UpdateCategoryUsecase
} from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'
import { useShowCategoryStore } from '@/presentation/store'

import {
  type UpdateCategoryControllerProps,
  type UpdateCategoryController
} from './types'

export const useUpdateCategoryController = ({
  loadCategories
}: UpdateCategoryControllerProps): UpdateCategoryController => {
  const updateCategoryUsecase = inject<UpdateCategoryUsecase>(
    PROVIDERS.UPDATE_CATEGORY_USECASE
  )!
  const showCategoryUsecase = inject<ShowCategoryUsecase>(
    PROVIDERS.SHOW_CATEGORY_USECASE
  )!
  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!
  const router = useRouter()
  const route = useRoute()
  const store = useShowCategoryStore()
  const categoryId = computed<string>(() => route.params.id as string)

  const onClose = (): void => {
    void router.push({ name: constants.routes.categories.list })
  }

  const loadCategory = async (): Promise<void> => {
    if (!categoryId.value) {
      void router.push({ name: constants.routes.categories.list })
      return
    }

    try {
      const category = await showCategoryUsecase.execute(categoryId.value)
      store.$patch({ form: { ...category } })
    } catch (error: any) {
      notifier.error({ message: error.message })
      void router.push({ name: constants.routes.categories.list })
    }
  }

  const onSubmit = async (): Promise<void> => {
    if (store.isSubmitting) return

    store.$patch({ isSubmitting: true })

    try {
      await updateCategoryUsecase.execute(categoryId.value, store.form)
      notifier.success({ message: 'Área atualizada com sucesso' })
      void loadCategories()
      onClose()
    } catch (error: any) {
      notifier.error({ message: error.message })
    } finally {
      store.$patch({ isSubmitting: false })
    }
  }

  onMounted(loadCategory)

  return { store, onClose, onSubmit }
}
