import { type RemoteCategoryEntity } from '@/data/usecases'
import { type ListCategoriesOutputDto } from '@/domain/dto'

export type RemoteListCategoriesDto = Omit<
  ListCategoriesOutputDto,
  'categories'
> & {
  categories: RemoteCategoryEntity[]
}
