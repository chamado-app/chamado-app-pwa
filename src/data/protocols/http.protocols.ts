export interface HttpPostClient<T = any, R = any> {
  post: (props: HttpClient.Request<T>) => Promise<HttpClient.Response<R>>
}

export interface HttpClient<T = any, R = any> extends HttpPostClient<T, R> {
  request: (props: HttpClient.RequestRaw<T>) => Promise<HttpClient.Response<R>>
}

export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  notFound = 404,
  internalServerError = 500
}

export enum HttpMethod {
  post = 'POST'
}

export namespace HttpClient {
  export type Request<T> = {
    url: string
    body?: T
  }

  export type RequestRaw<T> = Request<T> & {
    method: HttpMethod
  }

  export type Response<T> = {
    statusCode: HttpStatusCode
    body?: T
  }
}
