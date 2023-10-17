import { faker } from '@faker-js/faker'

import { type CookieStorageOptions, QuasarCookie } from './quasar-cookie'

const mockedSetCookie = vi.fn()

vi.mock('quasar', () => ({
  Cookies: { set: (...props: []) => mockedSetCookie(...props) }
}))

type SutTypes = {
  sut: QuasarCookie
}

const makeSut = (): SutTypes => {
  const sut = new QuasarCookie()
  return { sut }
}

describe('QuasarCookie', () => {
  it('should call Quasar.Cookies.set with correct values', async () => {
    const key = faker.database.column()
    const value = faker.datatype.string()
    const options: CookieStorageOptions = { path: faker.internet.domainName() }
    const { sut } = makeSut()

    await sut.set({ key, value, options })

    expect(mockedSetCookie).toHaveBeenCalledWith(key, value, options)
  })

  it('should call Quasar.Cookies.set with correct values and without options', async () => {
    const key = faker.database.column()
    const value = faker.datatype.string()
    const { sut } = makeSut()

    await sut.set({ key, value })

    expect(mockedSetCookie).toHaveBeenCalledWith(key, value, {})
  })
})
