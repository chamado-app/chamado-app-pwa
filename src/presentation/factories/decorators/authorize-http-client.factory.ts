import { type HttpClient } from '@/data/protocols'
import { AuthorizeHttpClientDecorator } from '@/presentation/decorators'
import { useCookieStorage, useHttpClient } from '@/presentation/factories'

export const useAuthorizeHttpClient = (): HttpClient =>
  new AuthorizeHttpClientDecorator(useCookieStorage(), useHttpClient())
