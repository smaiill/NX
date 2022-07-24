export enum NuiAPP {
  NOTIFICATION = 'NX::notification',
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
