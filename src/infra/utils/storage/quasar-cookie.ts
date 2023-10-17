import { Cookies } from 'quasar'

import {
  type StorageGuetter,
  type StorageGuetterProps,
  type StorageSetter,
  type StorageSetterProps
} from '@/data/protocols'

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
  implements
    StorageSetter<string, CookieStorageOptions>,
    StorageGuetter<string>
{
  public async set(
    params: StorageSetterProps<string, CookieStorageOptions>
  ): Promise<void> {
    const { key, value, options = {} } = params
    Cookies.set(key, value, options)
  }

  public get(params: StorageGuetterProps): Promise<string> {
    const { key } = params
    return Cookies.get(key)
  }
}
