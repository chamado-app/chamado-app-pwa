import { type Usecase } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export interface CreateEquipmentUsecase extends Usecase<EquipmentEntity> {
  execute: (data: Partial<EquipmentEntity>) => Promise<EquipmentEntity>
}
