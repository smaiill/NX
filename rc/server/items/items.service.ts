import { ItemsEventsE } from '../../../types/events'
import { ItemT, PickupT } from '../../../types/items'
import { RespCB, RespT } from '../../../types/main'
import PlayerService from '@player/player.service'
import { items } from '@shared/load.file'
import Utils from '@shared/utils/misc'
import { logger } from '@utils/logger'

export class _ItemsService {
  private readonly items: ItemT[]
  private pickups: PickupT[]
  private usableItems: Map<string, Function>
  constructor() {
    this.items = items
    this.pickups = []
    this.usableItems = new Map()
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
    const uuid = Utils.uuid('MEDIUM')
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

    if (!nxPlayer || !itemInfo || !amount || amount === 0) return

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

      reject(`Pickup with id [${uuid}] was not found !`)
    })
  }

  public async takePickup(uuid: string, source: number): Promise<void> {
    try {
      const pickup = await this.findPickupById(uuid)
      const nxPlayer = await PlayerService.getPlayer(source)

      // TODO: Get coords between player and the pickup to prevent from hackers !

      if (nxPlayer) {
        nxPlayer.AddItem(pickup.name, pickup.amount, (resp: RespT) => {
          if (resp.status === 'succes') {
            this.pickups = this.pickups.filter(
              (pic) => pic.uuid !== pickup.uuid
            )
            emitNet(ItemsEventsE.REMOVE_PICKUP, -1, pickup.uuid)
          }
        })
      }
    } catch (error) {
      logger.error(error)
    }
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
    ...args: any
  ): Promise<void> {
    if (!this.usableItems.has(name)) {
      logger.error(`Can't use item: ${name} he is not registerd !`)
      return
    }

    const itemCB = this.usableItems.get(name)
    itemCB && itemCB(source, ...args)
  }

  public createItem(
    { name, label, weight, type, props = 'prop_cs_cardbox_01', data }: ItemT,
    cb?: RespCB
  ) {
    const itemData = { name, label, weight, type, props, data }

    if (!name || !label || !weight || !type || typeof weight !== 'number') {
      cb?.({
        status: 'error',
        message: "Can't create item invalid arguments provided !",
      })
      return
    }

    const alreadyExist = this.findItem(itemData.name)

    if (alreadyExist) {
      cb?.({
        status: 'error',
        message: `Can\'t create item [${itemData.name}] already exists !`,
      })
      return
    }

    itemData.name = itemData.name.toLowerCase().split(' ').join('_')

    try {
      const loadFile = JSON.parse(
        LoadResourceFile(GetCurrentResourceName(), 'config/nx.items.json')
      )
      loadFile.push(itemData)
      SaveResourceFile(
        GetCurrentResourceName(),
        'config/nx.items.json',
        JSON.stringify(loadFile, null, 2),
        -1
      )
      this.items.push(itemData)
      emit(ItemsEventsE.ITEM_CREATED, itemData)
      cb?.({ status: 'succes', message: 'item created.', data })
    } catch (error) {
      cb?.({ status: 'error', message: error as any })
    }
  }
}

export default new _ItemsService()
