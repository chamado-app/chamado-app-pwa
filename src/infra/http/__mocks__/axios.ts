import { faker } from '@faker-js/faker'
import axios, { HttpStatusCode } from 'axios'

export const mockHttpResponse = (): any => ({
  data: faker.datatype.json(),
  status: faker.helpers.objectValue(HttpStatusCode)
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
