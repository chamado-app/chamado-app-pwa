import { type Usecase } from '@/domain/base'
import {
  type ListEquipmentsInputDto,
  type ListEquipmentsOutputDto
} from '@/domain/dto'

export interface ListEquipmentsUsecase
  extends Usecase<ListEquipmentsOutputDto> {
  execute: (options: ListEquipmentsInputDto) => Promise<ListEquipmentsOutputDto>
}
