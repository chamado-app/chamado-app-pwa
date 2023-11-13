import { type Usecase } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export interface FetchEquipmentsUsecase extends Usecase<EquipmentEntity[]> {
  execute: () => Promise<EquipmentEntity[]>
}
