import { type ListOutputDto } from '@/domain/base'
import { type EquipmentEntity } from '@/domain/entities'

export type ListEquipmentsOutputDto = ListOutputDto & {
  equipments: EquipmentEntity[]
}
