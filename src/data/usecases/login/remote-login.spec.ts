import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/__mocks__/data'
import { type HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'
import type { Login, StoreAuthToken } from '@/domain/usecases'

import { RemoteLogin } from '.'

type SutTypes = {
  sut: RemoteLogin
  httpPostClient: HttpPostClient
  tokenStore: StoreAuthToken
  url: string
}

const makeSut = (): SutTypes => {
  const httpPostClient = new HttpPostClientSpy()
  const tokenStore: StoreAuthToken = { store: vi.fn() }
  const url = faker.internet.url()
  const sut = new RemoteLogin(url, httpPostClient, tokenStore)
  return { sut, httpPostClient, url, tokenStore }
}

describe('Usecaseses/RemoteLogin', () => {
  const mockedCredentials: Login.Input = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  it('should call HttpPostClient with correct values', async () => {
    const { sut, httpPostClient, url } = makeSut()
    const postSpy = vi.spyOn(httpPostClient, 'post')
    postSpy.mockResolvedValueOnce({ statusCode: HttpStatusCode.created })

    await sut.execute(mockedCredentials)

    expect(postSpy).toHaveBeenCalledWith({ url, body: mockedCredentials })
  })

  it('should throw UnauthorizedException if HttpPostClient returns 401', async () => {
    const { sut, httpPostClient } = makeSut()
    vi.spyOn(httpPostClient, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized
    })

    const promise = sut.execute(mockedCredentials)

    await expect(promise).rejects.toThrow(
      new UnauthorizedException('E-mail e/ou senha inválidos')
    )
  })

  it('should throw UnexpectedException if HttpPostClient returns 404', async () => {
    const { sut, httpPostClient } = makeSut()
    vi.spyOn(httpPostClient, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound
    })

    const promise = sut.execute(mockedCredentials)

    await expect(promise).rejects.toThrow(new UnexpectedException())
  })

  it('should throw UnexpectedException if HttpPostClient returns 500', async () => {
    const { sut, httpPostClient } = makeSut()
    vi.spyOn(httpPostClient, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.internalServerError
    })

    const promise = sut.execute(mockedCredentials)

    await expect(promise).rejects.toThrow(new UnexpectedException())
  })

  it('should return valid token if HttpPostClient returns 201', async () => {
    const { sut, httpPostClient } = makeSut()
    const httpResult = {
      statusCode: HttpStatusCode.created,
      body: { accessToken: faker.random.word() }
    }
    vi.spyOn(httpPostClient, 'post').mockResolvedValueOnce(httpResult)

    const result = await sut.execute(mockedCredentials)

    expect(result).toEqual(httpResult.body)
  })
})
