import { type RenderResult, render } from '@testing-library/vue'

import type { RenderOptions } from '@/test-utils/types'

import { QRow, type QRowProps } from '.'

const makeRender = (options: RenderOptions<QRowProps> = {}): RenderResult =>
  render(QRow, options)

const getElement = (container: Element): Element | null =>
  container.querySelector('.row > div > div')

describe('Components/Ui/Row', () => {
  it('should render with correct slot', () => {
    const slotValue = 'any_slot_value'

    const { getByText } = makeRender({ slots: { default: slotValue } })

    expect(getByText(slotValue)).toBeInTheDocument()
  })

  it('should render with "md" gutter by default prop', () => {
    const { container } = makeRender()

    expect(getElement(container)).toHaveClass('row', 'q-col-gutter-md')
  })

  it('should render with correct prop gutter', () => {
    const props: QRowProps = { gutter: 'lg' }

    const { container } = makeRender({ props })

    expect(getElement(container)).toHaveClass(
      'row',
      `q-col-gutter-${props.gutter}`
    )
  })
})
