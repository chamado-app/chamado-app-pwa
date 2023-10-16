import axios, { type AxiosResponse } from 'axios'

import {
  type HttpClient,
  HttpMethod,
  type HttpRequest,
  type HttpRequestRaw,
  type HttpResponse
} from '@/data/protocols'

export class AxiosHttpClient<T = any, R = any> implements HttpClient<T, R> {
  async request(request: HttpRequestRaw<T>): Promise<HttpResponse<R>> {
    const { method, url, body, headers } = request

    let httpResponse: AxiosResponse<R>
    try {
      httpResponse = await axios.request({
        url,
        method,
        data: body,
        headers
      })
    } catch (error: any) {
      httpResponse = error.response
    }

    return { statusCode: httpResponse.status, body: httpResponse.data }
  }

  async post(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.post })
  }

  async get(request: HttpRequest<T>): Promise<HttpResponse<R>> {
    return await this.request({ ...request, method: HttpMethod.get })
  }
}
