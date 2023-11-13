import { type Usecase } from '@/domain/base'
import { type DeleteEquipmentInputDto } from '@/domain/dto'

export interface DeleteEquipmentUsecase extends Usecase<void> {
  execute: (id: DeleteEquipmentInputDto) => Promise<void>
}
