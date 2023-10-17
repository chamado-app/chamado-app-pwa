import { defineStore } from 'pinia'

import { type TicketEntity } from '@/domain/entities'

export type TicketListState = {
  tickets: TicketEntity[]
}

export const useTicketListStore = defineStore('ticketList', {
  state: (): TicketListState => ({
    tickets: []
  })
})
