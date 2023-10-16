import { faker } from '@faker-js/faker'

import { HttpPostClientSpy } from '@/__mocks__/data'
import { type HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { type AuthenticateInputDto } from '@/domain/dto'
import { UnauthorizedException, UnexpectedException } from '@/domain/errors'
import type { StoreAuthTokenUsecase } from '@/domain/usecases'

import { RemoteAuthenticate } from '.'

type SutTypes = {
  sut: RemoteAuthenticate
  httpPostClient: HttpPostClient
  tokenStore: StoreAuthTokenUsecase
  url: string
}

const makeSut = (): SutTypes => {
  const httpPostClient = new HttpPostClientSpy()
  const tokenStore: StoreAuthTokenUsecase = { execute: vi.fn() }
  const url = faker.internet.url()
  const sut = new RemoteAuthenticate(url, httpPostClient, tokenStore)
  return { sut, httpPostClient, url, tokenStore }
}

describe('Usecaseses/RemoteAuthenticate', () => {
  const mockedCredentials: AuthenticateInputDto = {
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
