export interface DiscordWebhookI {
  data: any
  options?: {
    url?: string
  }
}

export interface RespT {
  status: 'succes' | 'error'
  message?: any
  data?: any
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

export enum NuiAPP {
  NOTIFICATION = 'NX::notification',
  INPUT = 'NX::input',
}

export interface RespCB {
  ({ status, message, data }: RespT): void
}
