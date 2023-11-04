export enum EquipmentStatus {
  DAMAGED = 'damaged',
  IN_REPAIR = 'in_repair',
  WASTED = 'wasted',
  WAS_REMOVED = 'was_removed',
  WORKING = 'working'
}

export interface EquipmentEntity {
  id: string
  name: string
  brand: string
  model: string
  type: string
  section: string
  serial?: string
  patrimony?: string
  additionalInfo?: string
  status: EquipmentStatus
  createdAt: Date
  updatedAt: Date
}
