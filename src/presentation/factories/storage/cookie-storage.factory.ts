import type { StorageSetter } from '@/data/protocols'
import { QuasarCookie } from '@/infra'

export const makeCookieStorage = (): StorageSetter => {
  return new QuasarCookie()
}
