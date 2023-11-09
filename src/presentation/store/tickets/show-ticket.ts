import { faker } from '@faker-js/faker'
import { defineStore } from 'pinia'

import {
  TicketStatus,
  type TicketEntity,
  TicketMessageType
} from '@/domain/entities'

export type ShowTicketStore = {
  data: TicketEntity
  isLoading: boolean
  isLoaded: boolean
}

let lastDate: Date = faker.date.recent()

const getSentAt = (): Date => {
  lastDate = new Date(
    lastDate.getTime() + 1000 * 60 * faker.datatype.number({ min: 5, max: 45 })
  )
  return lastDate
}

const makeFakeTicket = (): TicketEntity => ({
  id: 'id',
  code: 'code',
  title: 'A impressora da sala 5 não está funcionando',
  createdAt: lastDate,
  updatedAt: lastDate,
  messages: [
    {
      id: faker.datatype.uuid(),
      owner: {
        id: faker.datatype.uuid(),
        name: 'Maria dos Santos',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
      },
      sentAt: lastDate,
      readAt: new Date(),
      ticketId: 'e66e8e73-cce3-4a91-a3a0-890afa9882f5',
      message: {
        type: TicketMessageType.TEXT,
        text: 'Ao tentar imprimir a impressão vai para a fila, mas não imprime, apenas fica aguardando'
      }
    },
    {
      id: faker.datatype.uuid(),
      owner: {
        id: '56678f4a-3e56-40b5-bbf4-3d4a3abfa269',
        name: 'João da Silva',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      },
      sentAt: getSentAt(),
      readAt: new Date(),
      ticketId: 'e66e8e73-cce3-4a91-a3a0-890afa9882f5',
      message: {
        type: TicketMessageType.TEXT,
        text: 'Será verificado'
      }
    },
    {
      id: faker.datatype.uuid(),
      sentAt: getSentAt(),
      readAt: new Date(),
      ticketId: 'e66e8e73-cce3-4a91-a3a0-890afa9882f5',
      message: {
        type: TicketMessageType.SYSTEM,
        text: 'Situação do chamado alterado para "em andamento".'
      }
    },
    {
      id: faker.datatype.uuid(),
      owner: {
        id: '56678f4a-3e56-40b5-bbf4-3d4a3abfa269',
        name: 'João da Silva',
        avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
      },
      sentAt: getSentAt(),
      readAt: new Date(),
      ticketId: 'e66e8e73-cce3-4a91-a3a0-890afa9882f5',
      message: {
        type: TicketMessageType.TEXT,
        text: 'Em vistoria, o tecnico averigou e contantou que o driver estava desatualizado. Após a atualização a impressora voltou funcionar normalmente'
      }
    },

    {
      id: faker.datatype.uuid(),
      owner: {
        id: faker.datatype.uuid(),
        name: 'Maria dos Santos',
        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
      },
      sentAt: getSentAt(),
      readAt: new Date(),
      ticketId: 'e66e8e73-cce3-4a91-a3a0-890afa9882f5',
      message: {
        type: TicketMessageType.TEXT,
        text: 'Irei testar novamente amanhã, obrigado!'
      }
    }
  ],
  status: TicketStatus.IN_PROGRESS,
  totalMessages: 4
})

export const useShowTicketStore = defineStore('showTicket', {
  state: (): ShowTicketStore => ({
    data: makeFakeTicket(),
    isLoading: true,
    isLoaded: false
  })
})
