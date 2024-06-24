export interface HttpRequest {
  query?: any
  params?: any
  body?: any
  headers?: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
}
