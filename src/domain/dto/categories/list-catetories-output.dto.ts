import { type ListOutputDto } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export type ListCategoriesOutputDto = ListOutputDto & {
  categories: CategoryEntity[]
}
