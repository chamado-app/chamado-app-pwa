import type {
  StorageGuetter,
  StorageRemover,
  StorageSetter
} from '@/data/protocols'
import { QuasarCookie } from '@/infra'

export const useCookieStorage = (): StorageSetter &
  StorageGuetter &
  StorageRemover => {
  return new QuasarCookie()
}
