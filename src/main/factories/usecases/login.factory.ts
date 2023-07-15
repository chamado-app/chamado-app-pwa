import { constants } from '@/data/constants'
import { RemoteLogin } from '@/data/usecases'
import type { Login } from '@/domain/usecases'
import { makeApiUrl, makeHttpClient } from '@/main/factories'

export const makeLogin = (): Login =>
  new RemoteLogin(makeApiUrl(constants.urls.login), makeHttpClient())
