import PlayerService from 's@player/player.service'
import { items } from '@shared/load.file'
import Utils from '@shared/utils/misc'
import { logger } from 's@utils/logger'
import { ItemsEventsE } from '../../types/events'
import { ItemT, PickupT, UsabeItemsT } from '../../types/items'

export class _ItemsService {
  private Items: ItemT[]
  private Pickups: PickupT[]
  private UsableItems: UsabeItemsT
  private utils: typeof Utils
  constructor() {
    this.Items = items
    this.Pickups = []
    this.UsableItems = {}
    this.utils = Utils
  }

  isValidItem(itemName: string): false | ItemT {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) return false

    return item
  }

  getItemWeight(itemName: string): number {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) {
      return 0
    }

    return item.weight
  }

  getItemType(name: string): string | null {
    const item = this.isValidItem(name)

    if (item) {
      return item.type
    }

    return null
  }

  createPickup(
    name: string,
    amount: number,
    coords: number[],
    label: string,
    propsType: string
  ): void {
    const uuid = this.utils.uuid()
    this.Pickups.push({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
    })

    emitNet(
      ItemsEventsE.CREATE_PICKUP,
      -1,
      name,
      amount,
      coords,
      uuid,
      label,
      propsType
    )
  }

  findItem(name: string): false | ItemT {
    const item = this.Items.find((item) => item.name === name)

    if (item) {
      return item
    }

    return false
  }

  async dropItem(name: string, amount: number, source: number): Promise<void> {
    const nxPlayer = await PlayerService.getPlayer(source)

    if (nxPlayer) {
      const itemInfo = await this.findItem(name)
      if (itemInfo) {
        itemInfo.label = itemInfo.label.toLowerCase()
        const label = `~s~${itemInfo.label} ~g~${amount}`
        const propsToCreate = itemInfo.props
        nxPlayer.RemoveItem(name, amount, () => {
          const { x, y, z } = nxPlayer.GetCoords()
          this.createPickup(name, amount, [x, y, z], label, propsToCreate)
        })
      }
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

      if (pickup) {
        return resolve(pickup)
      }

      reject('')
    })
  }

  async takePickup(uuid: string, source: number): Promise<void> {
    this.findPickupById(uuid)
      .then(async (pickup: PickupT) => {
        this.Pickups = this.Pickups.filter((pic) => pic.uuid !== pickup.uuid)
        const nxPlayer = await PlayerService.getPlayer(source)
        if (nxPlayer) {
          nxPlayer.AddItem(pickup.name, pickup.amount, () => {
            emitNet(ItemsEventsE.REMOVE_PICKUP, -1, pickup.uuid)
          })
        }
      })
      .catch((err) => {})
  }

  registerUsableItem(name: string, cb: Function): void {
    if (!cb || typeof cb !== 'function') {
      logger.error(
        'function callback most be provided. [Misc.RegisterUsableItem]'
      )
      return
    }

    if (this.UsableItems[name]) {
      logger.warn(
        `item: [${name}] has already being registerd. [MISC.RegisterUsableItem]`
      )
    }

    this.UsableItems[name] = cb
  }

  async useItem(name: string, source: number, ...args: any[]): Promise<void> {
    if (!this.UsableItems[name]) {
      logger.error(`can't use item: ${name} he is not registerd.`)
      return
    }

    this.UsableItems[name](source, args)
  }

  public createItem({ name, label, weight, type, props }: ItemT, cb?: Function) {
    const data = { name, label, weight, type, props }
    if (
      !name ||
      !label ||
      !weight ||
      !type ||
      !props ||
      typeof weight !== 'number'
    ) {
      return logger.error('cant create item invalid args.')
    }
    data.name = data.name.toLowerCase()

    try {
      const loadFile = JSON.parse(
        LoadResourceFile(GetCurrentResourceName(), 'config/nx.items.json')
      )
      loadFile.push(data)
      SaveResourceFile(
        GetCurrentResourceName(),
        'config/nx.items.json',
        JSON.stringify(loadFile),
        -1
      )
      this.Items.push(data)
      emitNet(ItemsEventsE.ITEM_CREATED, data)
      cb && cb(data)
    } catch (error) {
      logger.error(`Error while creating item: [${data.name}]}`)
    }
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
