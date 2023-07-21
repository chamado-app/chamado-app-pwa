import type { Notifier } from '@/data/protocols'
import { QuasarNotifier } from '@/infra'

export const useNotifier = (): Notifier => {
  return new QuasarNotifier()
}
