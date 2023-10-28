import { type ListCategoriesController } from '@/presentation/controllers'
import { type useShowCategoryStore } from '@/presentation/store'

export type CreateCategoryControllerProps = {
  loadCategories: ListCategoriesController['loadCategories']
}

export interface CreateCategoryController {
  onSubmit: () => Promise<void>
  onCancel: () => void
  store: ReturnType<typeof useShowCategoryStore>
}
