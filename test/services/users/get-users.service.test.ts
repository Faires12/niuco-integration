import { NiucoIntegration, NiucoUser } from '../../../src/integration'
import { GetUsersService } from '../../../src/services'

let getUsersService: GetUsersService

describe('GetUsersService', () => {
  beforeAll(() => {
    getUsersService = new GetUsersService()
  })

  beforeEach(() => {})

  test('Should return non masked email for niuco domains', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'enabled',
        role: 'admin',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'admin',
        status: 'enabled',
        isPayer: true,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return masked email for non niuco domains', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@gmail.com',
        status: 'enabled',
        role: 'admin',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'j*********r@gmail.com',
        name: 'John Connor',
        role: 'admin',
        status: 'enabled',
        isPayer: true,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return isPayer equals to false in case of status = disabled', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'disabled',
        role: 'admin',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'admin',
        status: 'disabled',
        isPayer: false,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return isPayer equals to true in case of role = admin and status = enabled', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'enabled',
        role: 'admin',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'admin',
        status: 'enabled',
        isPayer: true,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return isPayer equals to true in case of role = editor and status = enabled', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'enabled',
        role: 'editor',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'editor',
        status: 'enabled',
        isPayer: true,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return isPayer equals to false in case of role = viewer and status = enabled', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'enabled',
        role: 'viewer',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'viewer',
        status: 'enabled',
        isPayer: false,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })

  test('Should return isPayer equals to false in case of role = system and status = enabled', async () => {
    jest.spyOn(NiucoIntegration.prototype, 'getUsers').mockResolvedValue([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        name: 'John Connor',
        email: 'john.connor@niuco.com.br',
        status: 'enabled',
        role: 'system',
        last_activity: 1649179152,
      },
    ] as NiucoUser[])

    const users = await getUsersService.getUsers()

    expect(users).toEqual([
      {
        id: '0373e634-2d03-457e-a24d-2b0c8c3b7c37',
        email: 'john.connor@niuco.com.br',
        name: 'John Connor',
        role: 'system',
        status: 'enabled',
        isPayer: false,
        last_activity: '1970-01-20T02:06:19.152Z',
      },
    ])
  })
})
