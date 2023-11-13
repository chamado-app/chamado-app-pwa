import { defineStore } from 'pinia'

import { type TicketEntity } from '@/domain/entities'

export type ShowTicketStore = {
  data: TicketEntity
  isLoading: boolean
  isLoaded: boolean
}

export const useShowTicketStore = defineStore('showTicket', {
  state: (): ShowTicketStore => ({
    data: { id: '', messages: [] } as unknown as TicketEntity,
    isLoading: false,
    isLoaded: true
  })
})
