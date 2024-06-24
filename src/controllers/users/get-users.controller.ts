import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { GetUsersService } from '../../services'

export class GetUserController extends Controller {
  protected async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const getUsersService = new GetUsersService()

    const res = await getUsersService.getUsers()

    return {
      statusCode: 200,
      body: res,
    }
  }
}
