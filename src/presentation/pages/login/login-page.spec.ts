import { type RenderResult, render } from '@/__helpers__/utils'

import LoginPage from './login-page.vue'

const makeRender = (): RenderResult => render(LoginPage)

describe('Pages/Login', () => {
  it('should render correctly', () => {
    const { getByText } = makeRender()

    expect(getByText('E-mail')).toBeInTheDocument()
    expect(getByText('Senha')).toBeInTheDocument()
    expect(getByText('entrar')).toBeInTheDocument()
  })
})
