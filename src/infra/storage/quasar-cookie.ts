import { Cookies } from 'quasar'

import { type StorageSetter } from '@/data/protocols'

export type CookieStorageOptions = {
  expires?: number | string | Date
  path?: string
  domain?: string
  sameSite?: 'Lax' | 'Strict' | 'None'
  httpOnly?: boolean
  secure?: boolean
  other?: string
}

export class QuasarCookie
  implements StorageSetter<string, CookieStorageOptions>
{
  public async set(
    params: StorageSetter.Props<string, CookieStorageOptions>
  ): Promise<void> {
    const { key, value, options = {} } = params
    Cookies.set(key, value, options)
  }
}
