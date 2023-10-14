import axios, { type AxiosResponse } from 'axios'

import { type HttpClient, HttpMethod } from '@/data/protocols'

export class AxiosHttpClient<T = any, R = any> implements HttpClient<T, R> {
  async request(
    request: HttpClient.RequestRaw<T>
  ): Promise<HttpClient.Response<R>> {
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

  async post(request: HttpClient.Request<T>): Promise<HttpClient.Response<R>> {
    return await this.request({ ...request, method: HttpMethod.post })
  }

  async get(request: HttpClient.Request<T>): Promise<HttpClient.Response<R>> {
    return await this.request({ ...request, method: HttpMethod.get })
  }
}
