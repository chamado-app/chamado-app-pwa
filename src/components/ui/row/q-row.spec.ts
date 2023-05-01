import {
  type RenderOptions,
  type RenderResult,
  render
} from '@testing-library/vue'

import { Row } from '.'
import type { QRowProps } from '.'

const makeSut = ({ props, slots }: RenderOptions = {}): RenderResult =>
  render(Row, { props, slots })

const getElement = (container: Element): Element | null =>
  container.querySelector('.row > div > div')

describe('Components/Ui/Row', () => {
  test('should render with correct slot', () => {
    const slotValue = 'any_slot_value'

    const { getByText } = makeSut({ slots: { default: slotValue } })

    expect(getByText(slotValue)).toBeInTheDocument()
  })

  test('should render with "md" gutter by default prop', () => {
    const { container } = makeSut()

    expect(getElement(container)).toHaveClass('row', 'q-col-gutter-md')
  })

  test('should render with correct prop gutter', () => {
    const props: QRowProps = { gutter: 'lg' }

    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass(
      'row',
      `q-col-gutter-${props.gutter}`
    )
  })
})
