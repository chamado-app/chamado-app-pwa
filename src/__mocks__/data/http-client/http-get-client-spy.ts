import {
  type HttpClient,
  type HttpGetClient,
  HttpStatusCode
} from '@/data/protocols'

export class HttpGetClientSpy implements HttpGetClient {
  url?: string
  response: HttpClient.Response<any> = {
    statusCode: HttpStatusCode.ok
  }

  async get(props: HttpClient.Request<any>): Promise<HttpClient.Response<any>> {
    this.url = props.url
    return this.response
  }
}
