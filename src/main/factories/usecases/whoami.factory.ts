import { constants } from '@/data/constants'
import { RemoteWhoAmI } from '@/data/usecases'
import type { WhoAmI } from '@/domain/usecases'
import { useApiUrl, useAuthorizeHttpClient } from '@/main/factories'

export const useWhoAmI = (): WhoAmI =>
  new RemoteWhoAmI(useApiUrl(constants.urls.whoami), useAuthorizeHttpClient())
