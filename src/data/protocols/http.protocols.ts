export enum HttpMethod {
  get = 'GET',
  post = 'POST'
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  unauthorized = 401,
  notFound = 404,
  internalServerError = 500
}

export type HttpRequest<T> = {
  url: string
  body?: T
  headers?: Record<string, string>
}

export type HttpRequestRaw<T> = HttpRequest<T> & {
  method: HttpMethod
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}

export interface HttpGetClient<T = any, R = any> {
  get: (props: HttpRequest<T>) => Promise<HttpResponse<R>>
}

export interface HttpPostClient<T = any, R = any> {
  post: (props: HttpRequest<T>) => Promise<HttpResponse<R>>
}

export interface HttpClient<T = any, R = any>
  extends HttpPostClient<T, R>,
    HttpGetClient<T, R> {
  request: (props: HttpRequestRaw<T>) => Promise<HttpResponse<R>>
}
