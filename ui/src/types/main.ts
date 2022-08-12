export enum NuiAPP {
  NOTIFICATION = 'NX::notification',
  LOADING_BAR = 'NX::loadingBar',
  TIMELINE = 'NX::timeline',
  INPUT = 'NX::input',
}

export interface RespT {
  status: 'succes' | 'error'
  message?: any
  data?: any
}

export interface RespCB {
  ({ status, message, data }: RespT): void
}
