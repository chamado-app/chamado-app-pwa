import { type EquipmentEntity } from '@/domain/entities'

import { type RemoteEquimentEntity as RemoteEquipmentEntity } from './types'

export const parseRemoteEquipmentEntityToEquipmentEntity = ({
  createdAt,
  updatedAt,
  ...equipment
}: RemoteEquipmentEntity): EquipmentEntity => ({
  ...equipment,
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt)
})
