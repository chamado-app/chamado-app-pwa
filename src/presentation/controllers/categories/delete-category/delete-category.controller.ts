import { inject } from 'vue'

import { type Notifier } from '@/data/protocols'
import { type DeleteCategoryUsecase } from '@/domain/usecases'
import { PROVIDERS } from '@/presentation/providers'

import {
  type DeleteCategoryController,
  type DeleteCategoryControllerProps
} from './types'

export const useDeleteCategoryController = (
  props: DeleteCategoryControllerProps
): DeleteCategoryController => {
  const deleteCategoryUsecase = inject<DeleteCategoryUsecase>(
    PROVIDERS.DELETE_CATEGORY_USECASE
  )!

  const notifier = inject<Notifier>(PROVIDERS.NOTIFIER)!

  const deleteHandler = async (id: string): Promise<void> => {
    try {
      await deleteCategoryUsecase.execute(id)
      notifier.success({ message: 'Área excluída com sucesso.' })
      void props.loadCategories()
    } catch (error: any) {
      notifier.error({ message: error.message })
    }
  }

  return { deleteHandler }
}
