import { HttpException } from './exception'
import { HttpRequest, HttpResponse } from './http'

export abstract class Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const res = await this.perform(httpRequest)
      return res
    } catch (error) {
      console.log(error)

      if (error instanceof HttpException) {
        return {
          statusCode: error.statusCode,
          body: { message: error.message },
        }
      }

      return {
        statusCode: 500,
        body: { message: 'Interval Server Error' },
      }
    }
  }
  protected abstract perform(httpRequest: HttpRequest): Promise<HttpResponse>
}
