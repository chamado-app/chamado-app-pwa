import { keys } from '@/data/constants/keys'
import {
  type HttpClient,
  HttpMethod,
  type StorageGuetter
} from '@/data/protocols'

export class AuthorizeHttpClientDecorator<T, R> implements HttpClient<T, R> {
  constructor(
    private readonly getStorage: StorageGuetter<string>,
    private readonly httpClient: HttpClient<T, R>
  ) {}

  async request(
    request: HttpClient.RequestRaw<T>
  ): Promise<HttpClient.Response<R>> {
    const accessToken = await this.getStorage.get({ key: keys.accessToken })

    return await this.httpClient.request({
      ...request,
      headers: { ...request.headers, Authorization: accessToken }
    })
  }

  async post(request: HttpClient.Request<T>): Promise<HttpClient.Response<R>> {
    return await this.request({ ...request, method: HttpMethod.post })
  }

  async get(request: HttpClient.Request<T>): Promise<HttpClient.Response<R>> {
    return await this.request({ ...request, method: HttpMethod.get })
  }
}
