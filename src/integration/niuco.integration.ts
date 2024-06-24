import axios, { AxiosInstance } from 'axios'
import { env } from 'process'

export interface NiucoUser {
  id: string
  name: string
  email: string
  status: 'enabled' | 'disabled'
  role: 'viewer' | 'system' | 'editor' | 'admin'
  last_activity: number
}

export class NiucoIntegration {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.NIUCO_USERS_ENDPOINT,
    })
  }

  async getUsers(): Promise<NiucoUser[]> {
    const res = await this.axiosInstance.get('users')
    return res.data
  }
}
