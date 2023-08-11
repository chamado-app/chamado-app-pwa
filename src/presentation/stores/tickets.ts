import { defineStore } from 'pinia'

import { type TicketEntity } from '@/domain/entities'

type State = {
  data: TicketEntity[]
}

export const useTickets = defineStore('tickets', {
  state: (): State => ({
    data: []
  })
})
