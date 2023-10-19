import { type ListCategoriesOutputDto } from '@/domain/dto'
import { type CategoryEntity } from '@/domain/entities'

export type RemoteListCategoriesDto = Omit<
  ListCategoriesOutputDto,
  'categories'
> & {
  categories: Array<
    Omit<CategoryEntity, 'createdAt' | 'updatedAt'> & {
      createdAt: string
      updatedAt: string
    }
  >
}
