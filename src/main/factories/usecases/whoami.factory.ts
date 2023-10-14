import { RemoteWhoAmI } from '@/data/usecases'
import type { WhoAmI } from '@/domain/usecases'
import { constants } from '@/infra/constants'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useWhoAmIUsecase = (): WhoAmI =>
  new RemoteWhoAmI(useApiUrl(constants.urls.whoami), useAuthorizeHttpClient())
