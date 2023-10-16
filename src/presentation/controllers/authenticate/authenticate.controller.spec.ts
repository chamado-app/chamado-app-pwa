import { faker } from '@faker-js/faker'

import { UnauthorizedException } from '@/domain/errors'
import type { StoreAuthTokenUsecase } from '@/domain/usecases'

import { useAuthenticateController } from '.'
import type { AuthenticateController } from './types'

const mockedAuthenticateExecute = vi.fn()
const mockedNofifyError = vi.fn()
const mockedRouterReplace = vi.fn()

vi.mock('@/main/factories', () => ({
  useLogin: () => ({ execute: mockedAuthenticateExecute }),
  useNotifier: () => ({ error: mockedNofifyError })
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({ replace: mockedRouterReplace })
}))

const makeSut = (): { sut: ReturnType<typeof useAuthenticateController> } => {
  const sut = useAuthenticateController()
  return { sut }
}

describe.skip('useAuthenticateController', () => {
  const mockedState: AuthenticateController.State = {
    form: { email: 'any_email', password: 'any_password' },
    loading: false
  }

  const mockedAccessToken: StoreAuthTokenUsecase.Input = {
    accessToken: faker.datatype.uuid(),
    type: faker.random.word()
  }

  beforeAll(() => {
    mockedAuthenticateExecute.mockResolvedValue(mockedAccessToken)
  })

  it('should execute login function on authenticate', async () => {
    const { sut } = makeSut()
    const { authenticate, state } = sut
    state.form = { ...mockedState.form }

    await authenticate()

    expect(mockedAuthenticateExecute).toHaveBeenCalledWith({
      ...mockedState.form
    })
    expect(mockedRouterReplace).toHaveBeenCalledWith({ name: 'main' })
  })

  it('show call notify on error', async () => {
    const error = new UnauthorizedException(faker.datatype.string())
    mockedAuthenticateExecute.mockRejectedValueOnce(error)
    const { sut } = makeSut()
    const { authenticate } = sut

    await authenticate()
    expect(mockedNofifyError).toHaveBeenCalledWith({ message: error.message })
  })
})
