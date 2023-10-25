import type { StorageGuetter, StorageSetter } from '@/data/protocols'
import { QuasarCookie } from '@/infra'

export const useCookieStorage = (): StorageSetter & StorageGuetter =>
  new QuasarCookie()
