import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export interface CreateCategoryUsecase extends Usecase<CategoryEntity> {
  execute: (data: Partial<CategoryEntity>) => Promise<CategoryEntity>
}
