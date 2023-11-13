import { EquipmentStatus } from '@/domain/entities'

import { type EquipmentStatusMapped } from './types'

export const EQUIPMENT_STATUS_MAPPED: EquipmentStatusMapped[] = [
  { value: EquipmentStatus.WORKING, label: 'Funcionando' },
  { value: EquipmentStatus.DAMAGED, label: 'Danificado' },
  { value: EquipmentStatus.IN_REPAIR, label: 'Em reparo' },
  { value: EquipmentStatus.WAS_REMOVED, label: 'Removido' },
  { value: EquipmentStatus.WASTED, label: 'Sucata' }
]
