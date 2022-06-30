import { Console } from 'console'
import { items } from '../../shared/load.file'
import { PlayerEventsE } from '../../types/events'
import PlayerService from '../player/player.service'
import { _Utils } from '../utils/misc'

export class _ItemsService {
  Items: any[]
  Pickups: any[]
  constructor() {
    this.Items = items
    this.Pickups = []
  }

  isValidItem(itemName: string): boolean {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) return false

    return true
  }

  getItemWeight(itemName: string): number {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) {
      return 0
    }

    return item.weight
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
