import { CookieStoreAuthToken } from '@/data/usecases'
import type { StoreAuthTokenUsecase } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useCookieStorage } from '@/main/factories'

export const useStoreAuthToken = (): StoreAuthTokenUsecase => {
  const key = constants.keys.accessToken
  return new CookieStoreAuthToken(key, useCookieStorage())
}
