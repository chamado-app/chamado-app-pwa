import { type ListEquipmentsOutputDto } from '@/domain/dto'

import { type RemoteEquimentEntity } from '../types'

export type RemoteListEquipmentDto = Omit<
  ListEquipmentsOutputDto,
  'equipments'
> & {
  equipments: RemoteEquimentEntity[]
}
