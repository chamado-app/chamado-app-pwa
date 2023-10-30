import { constants } from '@/constants'
import {
  type HttpClient,
  HttpMethod,
  type HttpRequest,
  type HttpRequestRaw,
  type HttpResponse,
  type StorageGuetter
} from '@/data/protocols'

export class AuthorizeHttpClientDecorator<T, R> implements HttpClient<T, R> {
  constructor(
    private readonly getStorage: StorageGuetter<string>,
    private readonly httpClient: HttpClient<T, R>
  ) {}

  async request(request: HttpRequestRaw<T>): Promise<HttpResponse<R>> {
    const accessToken = await this.getStorage.get({
      key: constants.keys.accessToken
    })

    return await this.httpClient.request({
      ...request,
      headers: { ...request.headers, Authorization: accessToken }
    })
  }

  async post(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.post })
  }

  async put(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.put })
  }

  async get(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.get })
  }

  async delete(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.delete })
  }
}
