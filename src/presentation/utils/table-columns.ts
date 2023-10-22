import { type QTableProps } from 'quasar'
import { type ComputedRef, computed } from 'vue'

import { type TableColumns } from '@/presentation/types'

import { useIsMobile } from './screen'

export const useTableColumns = (
  desktop: TableColumns,
  mobile: TableColumns
): ComputedRef<TableColumns> => {
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
