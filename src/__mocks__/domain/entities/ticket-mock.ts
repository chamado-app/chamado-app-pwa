import { faker } from '@faker-js/faker'

import { type TicketEntity } from '@/domain/entities'

export const mockTicketEntity = (): TicketEntity => ({
  code: `${faker.datatype.string(2)}${faker.datatype.number({
    min: 10,
    max: 999
  })}`,
  id: faker.datatype.uuid(),
  status: faker.helpers.arrayElement(['in-progress', 'done']),
  lastMessage: {
    content: faker.lorem.words(10),
    date: faker.datatype.datetime().getTime()
  },
  title: faker.lorem.words(5),
  totalMessages: faker.datatype.number({ min: 2, max: 10 })
})
