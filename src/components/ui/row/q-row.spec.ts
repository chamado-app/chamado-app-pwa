import { type RenderResult, render } from '@testing-library/vue'

import type { RenderOptions } from '@/tests/types'

import { type QRowProps, Row } from '.'

const makeRender = (options: RenderOptions<QRowProps> = {}): RenderResult =>
  render(Row, options)

const getElement = (container: Element): Element | null =>
  container.querySelector('.row > div > div')

describe('Components/Ui/Row', () => {
  test('should render with correct slot', () => {
    const slotValue = 'any_slot_value'

    const { getByText } = makeRender({ slots: { default: slotValue } })

    expect(getByText(slotValue)).toBeInTheDocument()
  })

  test('should render with "md" gutter by default prop', () => {
    const { container } = makeRender()

    expect(getElement(container)).toHaveClass('row', 'q-col-gutter-md')
  })

  test('should render with correct prop gutter', () => {
    const props: QRowProps = { gutter: 'lg' }

    const { container } = makeRender({ props })

    expect(getElement(container)).toHaveClass(
      'row',
      `q-col-gutter-${props.gutter}`
    )
  })
})
