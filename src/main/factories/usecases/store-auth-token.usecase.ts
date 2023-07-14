import { constants } from '@/data/constants'
import { CookieStoreAuthToken } from '@/data/usecases'
import type { StoreAuthToken } from '@/domain/usecases'
import { makeCookieStorage } from '@/main/factories'

export const makeStoreAuthToken = (): StoreAuthToken => {
  const key = constants.keys.accessToken
  return new CookieStoreAuthToken(key, makeCookieStorage())
}
