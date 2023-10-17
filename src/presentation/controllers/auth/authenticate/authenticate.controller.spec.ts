import { faker } from '@faker-js/faker'

import { type AuthenticateOutputDto } from '@/domain/dto'
import { UnauthorizedException } from '@/domain/errors'

import { useAuthenticateController } from '.'
import type { AuthenticateControllerState } from './types'

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
  const mockedState: AuthenticateControllerState = {
    form: { email: 'any_email', password: 'any_password' },
    loading: false
  }

  const mockedAccessToken: AuthenticateOutputDto = {
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
