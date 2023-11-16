import { constants } from '@/constants'
import { type HttpClient } from '@/data/protocols'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import {
  useCookieStorage,
  useHttpClient,
  useRemoveAuthToken
} from '@/main/factories'

export const useAuthorizeHttpClient = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    useCookieStorage(),
    useHttpClient(),
    useRemoveAuthToken(),
    constants.keys.accessToken,
    '/auth/login'
  )
