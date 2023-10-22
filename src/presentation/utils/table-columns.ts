import { type QTableProps } from 'quasar'
import { type ComputedRef, computed } from 'vue'

import { type TableColumn } from '@/presentation/types'

import { useIsMobile } from './screen'

export const useTableColumns = (
  desktop: TableColumn[],
  mobile: TableColumn[]
): ComputedRef<TableColumn[]> => {
  const isMobile = useIsMobile()
  const columns = computed(() => (isMobile.value ? mobile : desktop))
  return columns
}

export const useDefaultTableProps = (): ComputedRef<QTableProps> => {
  const isMobile = useIsMobile()
  const props = computed<QTableProps>(() => ({
    flat: true,
    hidePagination: true,
    dense: isMobile.value,
    wrapCells: isMobile.value,
    grid: isMobile.value,
    binaryStateSort: true,
    bordered: true,
    rowKey: 'id'
  }))

  return props
}

const formatTimestepTableColumn = (value: Date): string => {
  return value.toLocaleString(undefined, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const idTableColumn: TableColumn = {
  name: 'id',
  field: 'id',
  label: 'Código',
  align: 'left'
}

export const createdAtTableColumn: TableColumn = {
  name: 'createdAt',
  field: 'createdAt',
  label: 'Criado em',
  align: 'left',
  format: formatTimestepTableColumn
}

export const updatedAtTableColumn: TableColumn = {
  name: 'createdAt',
  field: 'createdAt',
  label: 'Criado em',
  align: 'left',
  format: formatTimestepTableColumn
}

export const timestepTableColumns: TableColumn[] = [
  updatedAtTableColumn,
  createdAtTableColumn
]
