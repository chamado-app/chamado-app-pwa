import { faker } from '@faker-js/faker'

import {
  HttpMethod,
  type HttpRequest,
  type HttpRequestRaw
} from '@/data/protocols'

export const mockHttpPostRequest = (): HttpRequest<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

export const mockHttpRequest = (): HttpRequestRaw<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
  method: faker.helpers.objectValue(HttpMethod)
})
