import {
  type RenderOptions,
  type RenderResult,
  render
} from '@testing-library/vue'

import { Col } from '.'
import type { QColProps } from '.'

const makeSut = ({ props, slots }: RenderOptions = {}): RenderResult =>
  render(Col, { props, slots })

const getElement = (container: Element): Element | null =>
  container.querySelector('div > div')

describe('Components/Ui/Col', () => {
  test('should render with correct slot', () => {
    const slotValue = 'any_slot_value'

    const { getByText } = makeSut({ slots: { default: slotValue } })

    expect(getByText(slotValue)).toBeInTheDocument()
  })

  test('should render only with "col-12" class if no prop size is provided', () => {
    const { container } = makeSut()

    expect(getElement(container)).toHaveClass('col-12')
  })

  test('should render with "col-12" and "sm" classes if it is provided', () => {
    const props: QColProps = { sm: '6' }

    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass('col-12', `col-sm-${props.sm}`)
  })

  test('should render with "col-12" and "md" classes if it is provided', () => {
    const props: QColProps = { md: '4' }

    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass('col-12', `col-md-${props.md}`)
  })

  test('should render with "col-12" and "lg" classes if it is provided', () => {
    const props: QColProps = { lg: '3' }

    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass('col-12', `col-lg-${props.lg}`)
  })

  test('should render with "col-12" and "xl" classes if it is provided', () => {
    const props: QColProps = { xl: '2' }
    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass('col-12', `col-xl-${props.xl}`)
  })

  test('should render with all classes if it is provided', () => {
    const props: QColProps = { sm: '6', md: '4', lg: '3', xl: '2' }

    const { container } = makeSut({ props })

    expect(getElement(container)).toHaveClass(
      'col-12',
      `col-sm-${props.sm}`,
      `col-md-${props.md}`,
      `col-lg-${props.lg}`,
      `col-xl-${props.xl}`
    )
  })
})
