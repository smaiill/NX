import { items } from '../../shared/load.file'
import Utils from '../../shared/utils/misc'
import { ItemsEventsE } from '../../types/events'
import PlayerService from '../player/player.service'

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

  createPickup(name: string, amount: number, coords: number[], label: string): void {
    const uuid = Utils.uuid()
    this.Pickups.push({
      name,
      amount,
      coords,
      uuid,
      label,
    })

    emitNet(ItemsEventsE.CREATE_PICKUP, -1, name, amount, coords, uuid, label)
  }

  findItem(name: string): any {
    const item = this.Items.find((item) => item.name === name)

    if (item) {
      return item
    }

    return false
  }

  async dropItem(name: string, amount: number, source: number): Promise<void> {
    const naPlayer = await PlayerService.getPlayer(source)

    if (naPlayer) {
      const itemInfo = await this.findItem(name)
      const label = `${amount} ${itemInfo.label}`
      naPlayer.RemoveInventoryItem(name, amount, () => {
        const { x, y, z } = naPlayer.GetCoords()
        this.createPickup(name, amount, [x, y, z], label)
      })
    }
  }

  createMissingPickups(source: number): void {
    if (this.Pickups.length > 0) {
      emitNet(ItemsEventsE.CREATE_MISSING_PICKUPS, source, this.Pickups)
    }
  }

  findPickupById(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pickup = this.Pickups.find((pickup) => pickup.uuid === uuid)

      pickup && resolve(pickup)

      reject()
    })
  }

  async takePickup(uuid: string, source: number): Promise<void> {
    const pickup = await this.findPickupById(uuid)
    if (pickup) {
      const naPlayer = await PlayerService.getPlayer(source)
      if (naPlayer) {
        naPlayer.AddInventoryItem(pickup.name, pickup.amount, () => {
          this.Pickups = this.Pickups.filter((pic) => pic.uuid !== pickup.uuid)
          emitNet(ItemsEventsE.REMOVE_PICKUP, -1, pickup.uuid)
        })
      }
    }
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
