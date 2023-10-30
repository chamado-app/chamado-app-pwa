import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export interface UpdateCategoryUsecase extends Usecase<CategoryEntity> {
  execute: (
    id: string,
    data: Partial<CategoryEntity>
  ) => Promise<CategoryEntity>
}
