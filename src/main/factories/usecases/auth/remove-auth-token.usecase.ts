import { constants } from '@/constants'
import { CookieRemoveAuthToken } from '@/data/usecases'
import type { RemoveAuthTokenUsecase } from '@/domain/usecases'
import { useCookieStorage } from '@/main/factories'

export const useRemoveAuthToken = (): RemoveAuthTokenUsecase => {
  const key = constants.keys.accessToken
  return new CookieRemoveAuthToken(key, useCookieStorage())
}
