import {
  type HttpPostClient,
  type HttpRequest,
  type HttpResponse,
  HttpStatusCode
} from '@/data/protocols'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: string
  response: HttpResponse<any> = {
    statusCode: HttpStatusCode.ok
  }

  async post(props: HttpRequest<any>): Promise<HttpResponse<any>> {
    this.url = props.url
    this.body = props.body
    return this.response
  }
}
