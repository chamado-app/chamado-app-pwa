import { Cookies } from 'quasar'

import type { StorageSetter } from '@/data/protocols'

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
    key: string,
    value: string,
    options: CookieStorageOptions = {}
  ): Promise<void> {
    Cookies.set(key, value, options)
  }
}
