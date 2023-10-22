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
