import {
  type HttpGetClient,
  type HttpRequest,
  type HttpResponse,
  HttpStatusCode
} from '@/data/protocols'

export class HttpGetClientSpy implements HttpGetClient {
  url?: string
  response: HttpResponse<any> = {
    statusCode: HttpStatusCode.ok
  }

  async get(props: HttpRequest<any>): Promise<HttpResponse<any>> {
    this.url = props.url
    return this.response
  }
}
