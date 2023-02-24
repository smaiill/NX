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
export interface BanEventData {
  target: number
  duration: number
  reason: string
}
export interface Response {
  ok: boolean
  message?: any
  data?: any
}

export interface DiscordWebhook {
  data: any
  options: {
    url: string
  }
}

export interface ResponseCB {
  ({ ok, message, data }: Response): void
}
