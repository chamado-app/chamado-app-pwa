import { type ComputedRef } from 'vue'

import { type useListEquipmentsStore } from '@/presentation/store'
import { type ComputedPagination } from '@/presentation/types'

export interface ListEquipmentsController {
  store: ReturnType<typeof useListEquipmentsStore>
  pagination: ComputedRef<ComputedPagination>
  loadEquipments: () => Promise<void>
}
