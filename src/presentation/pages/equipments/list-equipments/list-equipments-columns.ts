import { type EquipmentStatus } from '@/domain/entities'
import { EQUIPMENT_STATUS_MAPPED } from '@/presentation/components'
import { type TableColumn } from '@/presentation/types'
import { idTableColumn, timestepTableColumns } from '@/presentation/utils'

const formatStatus = (value: EquipmentStatus): string => {
  const status = EQUIPMENT_STATUS_MAPPED.find((item) => item.value === value)
  return status?.label ?? 'Indefinido'
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
    format: formatStatus
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
