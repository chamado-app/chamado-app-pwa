import { faker } from '@faker-js/faker'

import type { StoreAuthToken } from '@/domain/usecases'

import { useLoginController } from '.'
import type { LoginController } from './types'

const mockedLoginExecute = vi.fn()
const mockedStoreAuthToken = vi.fn()

vi.mock('@/main/factories/usecases', () => ({
  makeLogin: () => ({ execute: mockedLoginExecute }),
  makeStoreAuthToken: () => ({ store: mockedStoreAuthToken })
}))

const makeSut = (): { sut: ReturnType<typeof useLoginController> } => {
  const sut = useLoginController()
  return { sut }
}

describe('useLoginController', () => {
  const mockedState: LoginController.State = {
    form: { email: 'any_email', password: 'any_password' },
    loading: false
  }

  const mockedAccessToken: StoreAuthToken.Input = {
    accessToken: faker.datatype.uuid(),
    type: faker.random.word()
  }

  it('should execute login function on authenticate', async () => {
    mockedLoginExecute.mockResolvedValueOnce(mockedAccessToken)
    const { sut } = makeSut()
    const { authenticate, state } = sut
    state.form = { ...mockedState.form }

    await authenticate()

    expect(mockedLoginExecute).toHaveBeenCalledWith({ ...mockedState.form })
    expect(mockedStoreAuthToken).toHaveBeenCalledWith({ ...mockedAccessToken })
  })
})
