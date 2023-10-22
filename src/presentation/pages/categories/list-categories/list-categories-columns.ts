import { type QTableProps } from 'quasar'

const idColumn: QTableProps['columns'] = [
  { name: 'id', field: 'id', label: 'Código', align: 'left' }
]

const listCategoriesColumns: QTableProps['columns'] = [
  { name: 'name', field: 'name', label: 'Nome', align: 'left' },
  {
    name: 'description',
    field: 'description',
    label: 'Descrição',
    align: 'left',
    format: (value: string) => value || '-'
  },
  {
    name: 'createdAt',
    field: 'createdAt',
    label: 'Criado em',
    align: 'left',
    format: (value: Date) => {
      return value.toLocaleString(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  {
    name: 'updatedAt',
    field: 'updatedAt',
    label: 'Atualizado em',
    align: 'left',
    format: (value: Date) => {
      return value.toLocaleString(undefined, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
]

export const listCategoriesColumnsMobile: QTableProps['columns'] = [
  ...listCategoriesColumns,
  ...idColumn
]

export const listCategoriesColumnsDesktop: QTableProps['columns'] = [
  ...idColumn,
  ...listCategoriesColumns
]
