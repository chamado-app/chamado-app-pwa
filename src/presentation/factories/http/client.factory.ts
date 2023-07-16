import type { HttpClient } from '@/data/protocols'
import { AxiosHttpClient } from '@/infra'

export const makeHttpClient = (): HttpClient => new AxiosHttpClient()
