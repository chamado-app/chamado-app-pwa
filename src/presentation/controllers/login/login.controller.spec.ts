import { useLoginController } from '.'
import type { LoginController } from './types'

const mockedLoginExecute = vi.fn()

vi.mock('@/main/factories/usecases', () => ({
  makeLogin: () => ({ execute: mockedLoginExecute })
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

  it('should execute login function on authenticate', async () => {
    const { sut } = makeSut()
    const { authenticate, state } = sut
    state.form = { ...mockedState.form }

    await authenticate()

    expect(mockedLoginExecute).toHaveBeenCalledWith({ ...mockedState.form })
  })
})
