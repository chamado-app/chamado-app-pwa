import { faker } from '@faker-js/faker'

import { StorageSetterSpy } from '@/__mocks__/data'
import { type AuthenticateOutputDto } from '@/domain/dto'

import { CookieStoreAuthToken } from '.'

type SutTypes = {
  sut: CookieStoreAuthToken
  storageSetter: StorageSetterSpy
  key: string
}

const makeSut = (): SutTypes => {
  const storageSetter = new StorageSetterSpy()
  const key = faker.database.column()
  const sut = new CookieStoreAuthToken(key, storageSetter)

  return { sut, storageSetter, key }
}

describe('CookieStoreAuthToken', () => {
  const mockedTokenData: AuthenticateOutputDto = {
    accessToken: faker.datatype.uuid(),
    type: 'Bearer'
  }

  it('should call StorageSetter with correct values', async () => {
    const { sut, storageSetter, key } = makeSut()

    await sut.execute(mockedTokenData)

    expect(storageSetter.key).toBe(key)
    expect(storageSetter.options).toEqual({ sameSite: 'Lax', path: '/' })
    expect(storageSetter.value).toBe(
      `${mockedTokenData.type} ${mockedTokenData.accessToken}`
    )
  })
})
