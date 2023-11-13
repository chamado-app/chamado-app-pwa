import { type EquipmentEntity } from '@/domain/entities'

export type RemoteEquipmentEntity = Omit<
  EquipmentEntity,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
