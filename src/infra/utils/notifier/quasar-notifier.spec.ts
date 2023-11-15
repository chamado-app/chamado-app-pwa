import { faker } from '@faker-js/faker'

import { type Notifier } from '@/data/protocols'

import { QuasarNotifier } from './quasar-notifier'

const mockedCreateNotify = vi.fn()

vi.mock('quasar', () => ({
  Notify: { create: (...props: any[]) => mockedCreateNotify(...props) }
}))

type SutTypes = {
  sut: Notifier
}

const makeSut = (): SutTypes => {
  const sut = new QuasarNotifier()
  return { sut }
}

const getExpectedProps = (
  props: Record<string, any> = {}
): Record<string, any> => ({
  position: 'bottom-left',
  progress: true,
  textColor: 'white',
  ...props
})

describe('Quasar Notifier', () => {
  it('should QuasarNotifier.notify call Notify.notify with correct values', () => {
    const message = faker.lorem.sentence()
    const { sut } = makeSut()

    sut.notify({ message, type: 'success' })

    expect(mockedCreateNotify).toHaveBeenCalledWith(
      getExpectedProps({ message, icon: 'mdi-check', type: 'positive' })
    )
  })

  it('should QuasarNotifier.success call Notify.notify with correct values', () => {
    const message = faker.lorem.sentence()
    const { sut } = makeSut()

    sut.success({ message })

    expect(mockedCreateNotify).toHaveBeenCalledWith(
      getExpectedProps({ message, icon: 'mdi-check', type: 'positive' })
    )
  })

  it('should QuasarNotifier.error call Notify.notify with correct values', () => {
    const message = faker.lorem.sentence()
    const { sut } = makeSut()

    sut.error({ message })

    expect(mockedCreateNotify).toHaveBeenCalledWith(
      getExpectedProps({ message, icon: 'mdi-close', type: 'negative' })
    )
  })

  it('should QuasarNotifier.info call Notify.notify with correct values', () => {
    const message = faker.lorem.sentence()
    const { sut } = makeSut()

    sut.info({ message })

    expect(mockedCreateNotify).toHaveBeenCalledWith(
      getExpectedProps({
        message,
        icon: 'mdi-information-outline',
        type: 'info'
      })
    )
  })

  it('should QuasarNotifier.warning call Notify.notify with correct values', () => {
    const message = faker.lorem.sentence()
    const { sut } = makeSut()

    sut.warning({ message })

    expect(mockedCreateNotify).toHaveBeenCalledWith(
      getExpectedProps({ message, icon: 'mdi-alert-outline', type: 'warning' })
    )
  })
})
