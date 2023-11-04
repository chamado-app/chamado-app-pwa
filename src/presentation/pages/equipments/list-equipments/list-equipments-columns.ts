import { EquipmentStatus } from '@/domain/entities'
import { type TableColumn } from '@/presentation/types'
import { idTableColumn, timestepTableColumns } from '@/presentation/utils'

const statusValue: Record<EquipmentStatus, string> = {
  [EquipmentStatus.DAMAGED]: 'Danificado',
  [EquipmentStatus.IN_REPAIR]: 'Em manutenção',
  [EquipmentStatus.WASTED]: 'Sucata',
  [EquipmentStatus.WAS_REMOVED]: 'Removido',
  [EquipmentStatus.WORKING]: 'Em funcionamento'
}

const tableColumns: TableColumn[] = [
  { name: 'name', field: 'name', label: 'Equipamento', align: 'left' },
  { name: 'brand', field: 'brand', label: 'Fabricante', align: 'left' },
  { name: 'model', field: 'model', label: 'Modelo', align: 'left' },
  {
    name: 'status',
    field: 'status',
    label: 'Situação',
    align: 'left',
    format: (value: EquipmentStatus) => statusValue[value]
  },
  ...timestepTableColumns
]

export const mobileTableColumns: TableColumn[] = [
  ...tableColumns,
  idTableColumn
]
export const desktopTableColumns: TableColumn[] = [
  idTableColumn,
  ...tableColumns
]
