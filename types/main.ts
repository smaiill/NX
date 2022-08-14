export enum NuiAPPS {
  NOTIFICATION = 'NX::notification',
  LOADING_BAR = 'NX::loadingBar',
  TIMELINE = 'NX::timeline',
  INPUT = 'NX::input',
}

export enum InventoryActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
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

export interface BanEventDataT {
  target: number
  duration: number
  reason: string
  bannedBy: string
}
export interface RespT {
  status: 'succes' | 'error'
  message?: any
  data?: any
}

export interface DiscordWebhookI {
  data: any
  options: {
    url: string
  }
}

export interface RespCB {
  ({ status, message, data }: RespT): void
}
