import { LG } from '@utils/logger'

export class PlayerError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PlayerError'
  }
}

export const PlayerLogger = LG.child({
  module: 'Player',
})
