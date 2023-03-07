export enum CodeColors {
  CLOSE = 0,
  DARK_RED = '^1',
  GREEN = '^2',
  ORANGE = '^3',
  BLUE = '^4',
  PURPLE = '^6',
  WHITE = '^7',
  RED = '^9',
}

export interface Icon {
  name: string
  size?: number
  otherClass?: string
}

export interface Defferals {
  defer(): void
  update(message: string): void
  presentCard<T = unknown>(
    card: object | string,
    cb?: (data: T, rawData: string) => void,
  ): void
  done(failureReason?: string): void
  handover(data: { [key: string]: unknown }): void
}
