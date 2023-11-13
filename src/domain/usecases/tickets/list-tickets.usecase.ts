import { type Usecase } from '@/domain/base'
import {
  type ListTicketsInputDto,
  type ListTicketsOutputDto
} from '@/domain/dto'

export interface ListTicketsUsecase extends Usecase<ListTicketsOutputDto> {
  execute: (options: ListTicketsInputDto) => Promise<ListTicketsOutputDto>
}
