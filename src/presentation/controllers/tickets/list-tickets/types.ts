import { type ComputedRef } from 'vue'

import { type useListTicketsStore } from '@/presentation/store'
import { type ComputedPagination } from '@/presentation/types'

export interface ListTicketsController {
  store: ReturnType<typeof useListTicketsStore>
  pagination: ComputedRef<ComputedPagination>
  loadTickets: () => Promise<void>
}
