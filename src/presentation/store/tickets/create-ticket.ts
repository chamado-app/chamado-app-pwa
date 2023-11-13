import { defineStore } from 'pinia'

import { type CreateTicketEntity } from '@/domain/entities'

export type ShowTicketState = {
  form: Partial<CreateTicketEntity>
  isSubmitting: boolean
}

export const useCreateTicketStore = defineStore('createTicket', {
  state: (): ShowTicketState => ({
    form: { equipmentId: '', categoryId: '', message: '', title: '' },
    isSubmitting: false
  })
})
