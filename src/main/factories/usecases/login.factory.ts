import { RemoteLogin } from '@/data/usecases'
import type { Login } from '@/domain/usecases'
import { constants } from '@/main/constants'
import { makeApiUrl, makeHttpClient } from '@/main/factories'

export const makeLogin = (): Login =>
  new RemoteLogin(makeApiUrl(constants.urls.login), makeHttpClient())
