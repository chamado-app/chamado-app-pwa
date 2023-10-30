import { type Usecase } from '@/domain/base'
import { type CategoryEntity } from '@/domain/entities'

export interface ShowCategoryUsecase extends Usecase<CategoryEntity> {
  execute: (id: string) => Promise<CategoryEntity>
}
