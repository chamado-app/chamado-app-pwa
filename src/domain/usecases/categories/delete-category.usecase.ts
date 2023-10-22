import { type Usecase } from '@/domain/base'
import { type DeleteCategoryInputDto } from '@/domain/dto'

export interface DeleteCategoryUsecase extends Usecase<void> {
  execute: (id: DeleteCategoryInputDto) => Promise<void>
}
