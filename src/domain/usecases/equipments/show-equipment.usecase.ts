import { type Usecase } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export interface ShowEquipmentUsecase extends Usecase<EquipmentEntity> {
  execute: (id: string) => Promise<EquipmentEntity>
}
