import { type ListCategoriesController } from '@/presentation/controllers'
import { type useShowCategoryStore } from '@/presentation/store'

export type UpdateCategoryControllerProps = {
  loadCategories: ListCategoriesController['loadCategories']
}

export interface UpdateCategoryController {
  onSubmit: () => Promise<void>
  onClose: () => void
  store: ReturnType<typeof useShowCategoryStore>
}
