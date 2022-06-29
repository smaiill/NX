export interface PlayerI {
  id: number
  identifier: string
  accounts: string
  permissions: 'user' | 'superadmin'
  inventory: any
  charinfo: any
  position: string
  skin: any
  source: number
}
