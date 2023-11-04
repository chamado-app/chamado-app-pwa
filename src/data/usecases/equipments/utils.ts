import { type EquipmentEntity } from '@/domain/entities'

import { type RemoteEquimentEntity } from './types'

export const parseRemoteEquipmentEntityToEquipmentEntity = ({
  createdAt,
  updatedAt,
  ...equipment
}: RemoteEquimentEntity): EquipmentEntity => ({
  ...equipment,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt)
})
