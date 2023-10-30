export enum HttpMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE'
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  unauthorized = 401,
  notFound = 404,
  unprocessableEntity = 422,
  internalServerError = 500
}

export type HttpRequest<T> = {
  url: string
  body?: T
  headers?: Record<string, string>
  params?: Record<string, string | number | undefined>
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

export interface HttpPutClient<T = any, R = any> {
  put: (props: HttpRequest<T>) => Promise<HttpResponse<R>>
}

export interface HttpDeleteClient<T = any, R = any> {
  delete: (props: HttpRequest<T>) => Promise<HttpResponse<R>>
}

export interface HttpClient<T = any, R = any>
  extends HttpPostClient<T, R>,
    HttpPutClient<T, R>,
    HttpGetClient<T, R>,
    HttpDeleteClient<T, R> {
  request: (props: HttpRequestRaw<T>) => Promise<HttpResponse<R>>
}
