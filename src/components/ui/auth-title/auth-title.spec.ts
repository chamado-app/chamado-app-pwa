import { faker } from '@faker-js/faker'
import { type RenderResult, render } from '@testing-library/vue'

import type { RenderOptions } from '@/test-utils/types'

import { AuthTitle, type AuthTitleProps } from '.'

const makeRender = (
  options: RenderOptions<AuthTitleProps> = {}
): RenderResult => render(AuthTitle, options)

describe('Components/Ui/AuthTitle', () => {
  it('should render with correct values', () => {
    const title = faker.lorem.words()
    const subtitle = faker.lorem.words()

    const { getByText } = makeRender({ props: { title, subtitle } })

    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(subtitle)).toBeInTheDocument()
  })
})
