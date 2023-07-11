import { type RenderResult, renderWithQuasar } from '@/__helpers__/utils'

import LoginPage from './login-page.vue'

const makeRender = (): RenderResult => renderWithQuasar(LoginPage)

describe('Pages/Login', () => {
  it('should render correctly', () => {
    const { getByLabelText, getByText } = makeRender()

    expect(getByLabelText('E-mail')).toBeInTheDocument()
    expect(getByLabelText('Senha')).toBeInTheDocument()
    expect(getByText('entrar')).toBeInTheDocument()
  })
})
