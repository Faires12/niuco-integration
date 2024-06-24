import { User } from '../../domain/entities'
import { NiucoIntegration } from '../../integration'
import { maskEmail } from '../../utils/masks'

export class GetUsersService {
  async getUsers(): Promise<User[]> {
    const niucoIntegration = new NiucoIntegration()

    const users: User[] = []
    const niucoUsers = await niucoIntegration.getUsers()

    niucoUsers.forEach((niucoUser) => {
      const isPayer =
        (niucoUser.role === 'editor' || niucoUser.role === 'admin') &&
        niucoUser.status === 'enabled'

      users.push({
        id: niucoUser.id,
        email: niucoUser.email.includes('@niuco.com.br')
          ? niucoUser.email
          : maskEmail(niucoUser.email),
        name: niucoUser.name,
        role: niucoUser.role,
        status: niucoUser.status,
        isPayer: isPayer,
        last_activity: new Date(niucoUser.last_activity).toISOString(),
      })
    })

    return users
  }
}
