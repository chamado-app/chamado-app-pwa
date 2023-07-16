import type { HttpClient } from '@/data/protocols'
import { AxiosHttpClient } from '@/infra'

export const useHttpClient = (): HttpClient => new AxiosHttpClient()
