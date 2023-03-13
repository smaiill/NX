import { LG } from '@utils/logger'

export class ItemsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ItemsError'
  }
}

export const ItemsLogger = LG.child({
  module: 'Items',
})
