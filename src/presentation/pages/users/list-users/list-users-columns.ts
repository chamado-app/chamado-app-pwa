import { type TableColumn } from '@/presentation/types'
import { idTableColumn, timestepTableColumns } from '@/presentation/utils'

const tableColumns: TableColumn[] = [
  { name: 'firstName', field: 'firstName', label: 'Nome', align: 'left' },
  { name: 'lastName', field: 'lastName', label: 'Sobrenome', align: 'left' },
  { name: 'email', field: 'email', label: 'E-mail', align: 'left' },
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
