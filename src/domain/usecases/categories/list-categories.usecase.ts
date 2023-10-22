import { type Usecase } from '@/domain/base'
import {
  type ListCategoriesInputDto,
  type ListCategoriesOutputDto
} from '@/domain/dto'

export interface ListCategoriesUsecase
  extends Usecase<ListCategoriesOutputDto> {
  execute: (options: ListCategoriesInputDto) => Promise<ListCategoriesOutputDto>
}
