import { faker } from '@faker-js/faker'

import { type HttpGetClient } from '@/data/protocols'
import {
  type ListTicketsInputDto,
  type ListTicketsOutputDto
} from '@/domain/dto'
import {
  TicketStatus,
  type TicketEntity,
  TicketMessageType
} from '@/domain/entities'
import type { ListTicketsUsecase } from '@/domain/usecases'

export class RemoteListTickets implements ListTicketsUsecase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpGetClient<
      ListTicketsInputDto,
      ListTicketsOutputDto
    >
  ) {}

  async execute(): Promise<ListTicketsOutputDto> {
    const { body } = await this.httpClient.get({ url: this.url })

    if (body && !body.tickets) {
      faker.setLocale('pt_BR')
      body.tickets = Array.from(
        { length: 10 },
        (): TicketEntity => ({
          id: faker.datatype.uuid(),
          title: faker.lorem.sentence(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
          messages: [],
          totalMessages: faker.datatype.number({ max: 7, min: 3 }),
          lastMessage: {
            id: faker.datatype.uuid(),
            message: {
              text: faker.lorem.sentence(),
              type: TicketMessageType.TEXT
            },
            ticketId: faker.datatype.uuid(),
            sentAt: faker.date.recent()
          },
          status: faker.helpers.arrayElement(Object.values(TicketStatus))
        })
      )
    }

    return { tickets: body?.tickets ?? [] }
  }
}
