import {
  type HttpClient,
  HttpMethod,
  type HttpRequest,
  type HttpRequestRaw,
  type HttpResponse,
  type StorageGuetter,
  HttpStatusCode
} from '@/data/protocols'
import { type RemoveAuthTokenUsecase } from '@/domain/usecases'

export class AuthorizeHttpClientDecorator<T, R> implements HttpClient<T, R> {
  constructor(
    private readonly getStorage: StorageGuetter<string>,
    private readonly httpClient: HttpClient<T, R>,
    private readonly removeStorage: RemoveAuthTokenUsecase,
    private readonly accessTokenKey: string,
    private readonly authenticateRoute: string
  ) {}

  async request(request: HttpRequestRaw<T>): Promise<HttpResponse<R>> {
    const accessToken = await this.getStorage.get({ key: this.accessTokenKey })

    const result = await this.httpClient.request({
      ...request,
      headers: { ...request.headers, Authorization: accessToken }
    })

    if (result.statusCode === HttpStatusCode.unauthorized) {
      await this.removeStorage.execute()
      window.location.replace(this.authenticateRoute)
    }

    return result
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
