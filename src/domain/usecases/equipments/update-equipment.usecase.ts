import { type Usecase } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export interface UpdateEquipmentUsecase extends Usecase<EquipmentEntity> {
  execute: (
    id: string,
    data: Partial<EquipmentEntity>
  ) => Promise<EquipmentEntity>
}
