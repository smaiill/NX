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

export interface RespCB {
  ({ status, message, data }: RespT): void
}
