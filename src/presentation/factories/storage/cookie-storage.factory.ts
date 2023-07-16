import type { StorageSetter } from '@/data/protocols'
import { QuasarCookie } from '@/infra'

export const useCookieStorage = (): StorageSetter => {
  return new QuasarCookie()
}
