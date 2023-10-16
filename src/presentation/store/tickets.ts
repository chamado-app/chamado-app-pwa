import { defineStore } from 'pinia'

import { type TicketEntity } from '@/domain/entities'

type State = {
  tickets: TicketEntity[]
}

export const useTickets = defineStore('tickets', {
  state: (): State => ({
    tickets: []
  })
})
