import { faker } from '@faker-js/faker'

import { HttpGetClientSpy } from '@/__mocks__/data'
import { type HttpGetClient, HttpStatusCode } from '@/data/protocols'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'

import { RemoteWhoAmI } from '.'

type SutTypes = {
  sut: RemoteWhoAmI
  httpGetClient: HttpGetClient
  url: string
}

const makeSut = (): SutTypes => {
  const httpGetClient = new HttpGetClientSpy()
  const url = faker.internet.url()
  const sut = new RemoteWhoAmI(url, httpGetClient)
  return { sut, httpGetClient, url }
}

describe('Usecaseses/RemoteWhoami', () => {
  it('should call HttpGetClient with correct values', async () => {
    const { sut, httpGetClient, url } = makeSut()
    const postSpy = vi.spyOn(httpGetClient, 'get')

    await sut.execute()

    expect(postSpy).toHaveBeenCalledWith({ url })
  })

  it('should throw UnauthorizedException if HttpGetClient returns 401', async () => {
    const { sut, httpGetClient } = makeSut()
    vi.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized
    })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow(
      new UnauthorizedException('Login inválido')
    )
  })

  it('should throw UnexpectedException if HttpGetClient returns 404', async () => {
    const { sut, httpGetClient } = makeSut()
    vi.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound
    })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow(new UnexpectedException())
  })

  it('should throw UnexpectedException if HttpGetClient returns 500', async () => {
    const { sut, httpGetClient } = makeSut()
    vi.spyOn(httpGetClient, 'get').mockResolvedValueOnce({
      statusCode: HttpStatusCode.internalServerError
    })

    const promise = sut.execute()

    await expect(promise).rejects.toThrow(new UnexpectedException())
  })

  it('should return valid token if HttpGetClient returns 200', async () => {
    const { sut, httpGetClient } = makeSut()
    const httpResult = {
      statusCode: HttpStatusCode.ok,
      body: { accessToken: faker.random.word() }
    }
    vi.spyOn(httpGetClient, 'get').mockResolvedValueOnce(httpResult)

    const result = await sut.execute()

    expect(result).toEqual(httpResult.body)
  })
})
