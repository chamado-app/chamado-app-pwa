import {
  type HttpClient,
  type HttpPostClient,
  HttpStatusCode
} from '@/data/protocols'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: string
  response: HttpClient.Response<any> = {
    statusCode: HttpStatusCode.ok
  }

  async post(
    props: HttpClient.Request<any>
  ): Promise<HttpClient.Response<any>> {
    this.url = props.url
    this.body = props.body
    return this.response
  }
}
