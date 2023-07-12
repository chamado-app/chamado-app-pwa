import { faker } from '@faker-js/faker'

import { type HttpClient, HttpMethod } from '@/data/protocols'

export const mockHttpPostRequest = (): HttpClient.Request<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

export const mockHttpRequest = (): HttpClient.RequestRaw<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
  method: faker.helpers.objectValue(HttpMethod)
})
