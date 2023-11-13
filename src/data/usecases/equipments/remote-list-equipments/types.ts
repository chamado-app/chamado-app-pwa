import { type ListEquipmentsOutputDto } from '@/domain/dto'

import { type RemoteEquipmentEntity } from '../types'

export type RemoteListEquipmentDto = Omit<
  ListEquipmentsOutputDto,
  'equipments'
> & {
  equipments: RemoteEquipmentEntity[]
}
