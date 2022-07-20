export interface DiscordWebhookI {
  data: any
  options?: {
    url?: string
  }
}

export interface RespT<T = any> {
  status: 'succes' | 'error'
  message?: string
  data?: T
}

export interface BanT {
  license: string
  bannedBy: string
  identifiers: string[]
  reason: string
  id: string
  date: number
  expire: number
}

export interface RespCB {
  ({ status, message, data }: RespT): void
}
