import { faker } from '@faker-js/faker'

import { UnauthorizedException } from '@/domain/errors'
import type { StoreAuthToken } from '@/domain/usecases'

import { useLoginController } from '.'
import type { LoginController } from './types'

const mockedLoginExecute = vi.fn()
const mockedStoreAuthToken = vi.fn()
const mockedNofifyError = vi.fn()
const mockedRouterReplace = vi.fn()

vi.mock('@/main/factories/usecases', () => ({
  makeLogin: () => ({ execute: mockedLoginExecute }),
  makeStoreAuthToken: () => ({ store: mockedStoreAuthToken }),
  makeNotifier: () => ({ error: mockedNofifyError })
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({ replace: mockedRouterReplace })
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

  beforeAll(() => {
    mockedLoginExecute.mockResolvedValue(mockedAccessToken)
  })

  it('should execute login function on authenticate', async () => {
    const { sut } = makeSut()
    const { authenticate, state } = sut
    state.form = { ...mockedState.form }

    await authenticate()

    expect(mockedLoginExecute).toHaveBeenCalledWith({ ...mockedState.form })
    expect(mockedStoreAuthToken).toHaveBeenCalledWith({ ...mockedAccessToken })
    expect(mockedRouterReplace).toHaveBeenCalledWith({ name: 'home' })
  })

  it('show call notify on error', async () => {
    const error = new UnauthorizedException(faker.datatype.string())
    mockedLoginExecute.mockRejectedValueOnce(error)
    const { sut } = makeSut()
    const { authenticate } = sut

    await authenticate()
    expect(mockedNofifyError).toHaveBeenCalledWith({ message: error.message })
  })
})
