import { type EquipmentEntity } from '@/domain/entities'

export type RemoteEquimentEntity = Omit<
  EquipmentEntity,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string
  updatedAt: string
}
