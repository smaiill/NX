import { LG } from '@utils/logger'

export class BansError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BansError'
  }
}

export const BansLogger = LG.child({
  module: 'Bans',
})
