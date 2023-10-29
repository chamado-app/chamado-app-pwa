import { type TableColumn } from '@/presentation/types'
import { idTableColumn, timestepTableColumns } from '@/presentation/utils'

const tableColumns: TableColumn[] = [
  { name: 'name', field: 'name', label: 'Nome', align: 'left' },
  {
    name: 'description',
    field: 'description',
    label: 'Descrição',
    align: 'left',
    format: (value: string) => value || '-'
  },
  {
    name: 'isActive',
    field: 'isActive',
    label: 'Ativação',
    align: 'left',
    format: (value: boolean) => (value ? 'Ativo' : 'Inativo')
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
