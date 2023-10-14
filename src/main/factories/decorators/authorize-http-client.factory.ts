import { type HttpClient } from '@/data/protocols'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { useCookieStorage, useHttpClient } from '@/main/factories'

export const useAuthorizeHttpClient = (): HttpClient =>
  new AuthorizeHttpClientDecorator(useCookieStorage(), useHttpClient())
