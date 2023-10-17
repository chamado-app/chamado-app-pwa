import { RemoteWhoAmI } from '@/data/usecases'
import type { WhoAmIUsecase } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useWhoAmIUsecase = (): WhoAmIUsecase =>
  new RemoteWhoAmI(useApiUrl(constants.urls.whoami), useAuthorizeHttpClient())
