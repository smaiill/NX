import { ItemsEventsE } from '../../types/events'
import { ItemT, PickupT } from '../../types/items'
import { RespCB, RespT } from '../../types/main'
import { items } from '@shared/load.file'
import Utils from '@shared/utils/misc'
import PlayerService from 's@player/player.service'
import { logger } from 's@utils/logger'

export class _ItemsService {
  private readonly items: ItemT[]
  private pickups: PickupT[]
  private usableItems: Map<string, Function>
  private utils: typeof Utils
  constructor() {
    this.items = items
    this.pickups = []
    this.usableItems = new Map()
    this.utils = Utils
  }

  public isValidItem(itemName: string): false | ItemT {
    const item = this.items.find((item) => item.name === itemName)

    if (item) return item

    return false
  }

  public getItemData(itemName: string): Record<string, any> | false {
    const item = this.items.find((item) => item.name === itemName)

    if (item) return item.data ?? false

    return false
  }

  public getItemWeight(itemName: string): number {
    const item = this.items.find((item) => item.name === itemName)

    if (item) return item.weight

    return 0
  }

  public getItemType(name: string): string | null {
    const item = this.isValidItem(name)

    if (item) return item.type

    return null
  }

  public createPickup(
    name: string,
    amount: number,
    coords: number[],
    label: string,
    propsType: string,
    itemType: string
  ): void {
    const uuid = this.utils.uuid()
    this.pickups.push({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
    })

    emitNet(ItemsEventsE.CREATE_PICKUP, -1, {
      name,
      amount,
      coords,
      uuid,
      label,
      propsType,
      itemType,
    })
  }

  private findItem(name: string): false | ItemT {
    const item = this.items.find((item) => item.name === name)

    if (item) return item

    return false
  }

  private getPropsToCreate(name: string, amount: number, defaultProps: string) {
    return defaultProps
  }

  public async dropItem(
    name: string,
    amount: number,
    source: number
  ): Promise<void> {
    const nxPlayer = await PlayerService.getPlayer(source)
    const itemInfo = await this.findItem(name)

    if (!nxPlayer || !itemInfo) return

    const label = `~s~${itemInfo.label} ~g~${amount}`.toLowerCase()
    const propsToCreate = await this.getPropsToCreate(
      name,
      amount,
      itemInfo.props
    )
    nxPlayer.RemoveItem(name, amount, (resp: RespT) => {
      if (resp.status !== 'succes') return

      const { x, y, z } = nxPlayer.GetCoords()
      this.createPickup(
        name,
        amount,
        [x, y, z],
        label,
        propsToCreate,
        itemInfo.type
      )
    })
  }

  public createMissingPickups(source: number): void {
    if (this.pickups.length > 0) {
      emitNet(ItemsEventsE.CREATE_MISSING_PICKUPS, source, this.pickups)
    }
  }

  private findPickupById(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pickup = this.pickups.find((pickup) => pickup.uuid === uuid)

      if (pickup) return resolve(pickup)

      reject('')
    })
  }

  public async takePickup(uuid: string, source: number): Promise<void> {
    this.findPickupById(uuid)
      .then(async (pickup: PickupT) => {
        this.pickups = this.pickups.filter((pic) => pic.uuid !== pickup.uuid)
        const nxPlayer = await PlayerService.getPlayer(source)
        if (nxPlayer) {
          nxPlayer.AddItem(pickup.name, pickup.amount, (resp: RespT) => {
            if (resp.status === 'succes') {
              emitNet(ItemsEventsE.REMOVE_PICKUP, -1, pickup.uuid)
            }
          })
        }
      })
      .catch((err) => logger.error(err))
  }

  public registerUsableItem(name: string, cb: Function): void {
    if (!cb || typeof cb !== 'function') {
      logger.error(
        'function callback most be provided. [Misc.RegisterUsableItem]'
      )
      return
    }

    if (this.usableItems.has(name)) {
      logger.warn(
        `item: [${name}] has already being registerd. [MISC.RegisterUsableItem]`
      )
    }

    this.usableItems.set(name, cb)
  }

  public async useItem(
    name: string,
    source: number,
    ...args: any[]
  ): Promise<void> {
    if (!this.usableItems.has(name)) {
      logger.error(`can't use item: ${name} he is not registerd.`)
      return
    }

    const itemCB = this.usableItems.get(name)
    itemCB && itemCB(source, args)
  }

  public createItem({ name, label, weight, type, props }: ItemT, cb?: RespCB) {
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

    const alreadyExist = this.findItem(data.name)

    if (alreadyExist) {
      cb &&
        cb({
          status: 'error',
          message: `cant create item: [${name}] already exists.}`,
        })
      return
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
      this.items.push(data)
      emit(ItemsEventsE.ITEM_CREATED, data)
      cb && cb({ status: 'succes', message: 'item created.', data })
    } catch (error) {
      cb && cb({ status: 'error', message: error as any })
    }
  }

  public removeAllPickups() {
    let uuids: string[] = []
    for (const pickup of this.pickups) {
      uuids.push(pickup.uuid as string)
    }
    this.pickups = []
    emitNet(ItemsEventsE.CLEAR_ALL_PICKUPS_C, -1, uuids)
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
