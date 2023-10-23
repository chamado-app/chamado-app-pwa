import { type ListCategoriesController } from '@/presentation/controllers'

export type DeleteCategoryControllerProps = {
  loadCategories: ListCategoriesController['loadCategories']
}

export interface DeleteCategoryController {
  deleteHandler: (id: string) => Promise<void>
}
