export enum NuiAPPS {
  NOTIFICATION = 'NX::notification',
  LOADING_BAR = 'NX::loadingBar',
  TIMELINE = 'NX::timeline',
  INPUT = 'NX::input',
  MENU = 'NX::menu',
}

export enum InventoryActions {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface InventoryActionData {
  type: keyof typeof InventoryActions
  name: string
  amount: number
}

export interface Ban {
  license: string
  bannedBy: string
  identifiers: string[]
  reason: string
  id: string
  expire: number
}

export type SavedBan = Ban & { date: Date }

export interface Response<T = any> {
  ok: boolean
  message?: string
  data?: T
}

export interface DiscordWebhook {
  data: unknown
  options: {
    url: string
  }
}

export type ResponseCB<T = any> = ({ ok, message, data }: Response<T>) => void
