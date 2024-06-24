export interface User {
  id: string
  name: string
  email: string
  status: 'enabled' | 'disabled'
  role: 'viewer' | 'system' | 'editor' | 'admin'
  last_activity: string
  isPayer: boolean
}
