import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export interface FetchCategoriesUsecase extends Usecase<CategoryEntity[]> {
  execute: () => Promise<CategoryEntity[]>
}
