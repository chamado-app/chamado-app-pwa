import type { Notifier } from '@/data/protocols'
import { QuasarNotifier } from '@/infra'

export const makeNotifier = (): Notifier => {
  return new QuasarNotifier()
}
