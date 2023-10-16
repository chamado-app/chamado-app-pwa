import type axios from 'axios'

import { mockHttpRequest } from '@/data/__mocks__'
import { HttpMethod } from '@/data/protocols'

import { mockAxios, mockHttpResponse } from './__mocks__'
import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  describe('request', () => {
    it('should call axios with correct values', async () => {
      const request = mockHttpRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.request(request)

      expect(mockedAxios.request).toHaveBeenCalledWith({
        data: request.body,
        url: request.url,
        method: request.method
      })
    })

    it('should return the correct status code and body', () => {
      const { sut, mockedAxios } = makeSut()

      const promise = sut.request(mockHttpRequest())

      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })

    it('should return the correct status code and body on failure', () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.request(mockHttpRequest())

      expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })

  describe('post', () => {
    it('should call axios with correct values', async () => {
      const request = mockHttpRequest()
      const { sut, mockedAxios } = makeSut()

      await sut.post(request)

      expect(mockedAxios.request).toHaveBeenCalledWith({
        data: request.body,
        url: request.url,
        method: HttpMethod.post
      })
    })

    it('should return the correct status code and body', () => {
      const { sut, mockedAxios } = makeSut()

      const result = sut.post(mockHttpRequest())

      expect(result).toEqual(mockedAxios.request.mock.results[0].value)
    })
  })
})
