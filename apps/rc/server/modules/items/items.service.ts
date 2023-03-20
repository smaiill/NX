import { ExportMethod, ExportService } from '@decorators/Export'
import { Item, ItemsEvents, Pickup, Response, ResponseCB } from '@nx/types'
import { uuid as _uuid } from '@shared/utils/random'
import { PlayerService } from 'modules/player/player.service'
import { ItemsDB } from './items.db'
import { ItemsLogger } from './items.misc'
import { createItemSchema, CreateItemType } from './items.schema'

@ExportService('Items')
class _ItemsService {
  private items: Item[]
  private pickups: Pickup[]
  private usableItems: Map<string, (source: number, ...args: unknown[]) => void>
  private db: typeof ItemsDB
  constructor() {
    this.items = []
    this.pickups = []
    this.usableItems = new Map()
    this.db = ItemsDB

    this.init()
  }

  public isValidItem(itemName: string): false | Item {
    const item = this.items.find((item) => item.name === itemName)

    if (item) return item

    return false
  }

  public getItem(name: string): Item | undefined | false {
    if (!name) return

    const item = this.items.find((item) => item.name === name)

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
    itemType: string,
    _unique: boolean,
    maxInSlot: number,
  ): void {
    const uuid = _uuid()
    this.pickups.push({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
      _unique,
      maxInSlot,
    })

    emitNet(ItemsEvents.CREATE_PICKUP, -1, {
      name,
      amount,
      coords,
      uuid,
      label,
      propsType,
      itemType,
      _unique,
      maxInSlot,
    })
  }

  private findItem(name: string): false | Item {
    const item = this.items.find((item) => item.name === name)

    if (item) return item

    return false
  }

  private getPropsToCreate(name: string, amount: number, defaultProps: string) {
    return defaultProps
  }

  public async dropItem(
    source: number,
    { amount, name }: { amount: number; name: string },
  ): Promise<void> {
    const nxPlayer = await PlayerService.getPlayer(source)
    const itemInfo = await this.findItem(name)

    if (!nxPlayer || !itemInfo || !amount || amount === 0) {
      return
    }

    const label = `~s~${itemInfo.label} ~g~${amount}`.toLowerCase()
    const propsToCreate = await this.getPropsToCreate(
      name,
      amount,
      itemInfo.props,
    )
    nxPlayer.RemoveItem(name, amount, (resp: Response) => {
      if (!resp.ok) {
        return
      }

      const { x, y, z } = nxPlayer.GetCoords()
      this.createPickup(
        name,
        amount,
        [x, y, z],
        label,
        propsToCreate,
        itemInfo.type,
        itemInfo._unique,
        itemInfo.maxInSlot,
      )
    })
  }

  public createMissingPickups(source: number): void {
    if (this.pickups.length > 0) {
      emitNet(ItemsEvents.CREATE_MISSING_PICKUPS, source, this.pickups)
    }
  }

  private async findPickupById(uuid: string): Promise<any> {
    const pickup = this.pickups.find((pickup) => pickup.uuid === uuid)

    if (!pickup) `Pickup with id [${uuid}] was not found !`

    return pickup
  }

  public async takePickup(uuid: string, source: number): Promise<void> {
    try {
      const pickup = await this.findPickupById(uuid)
      const nxPlayer = await PlayerService.getPlayer(source)

      // TODO: Get coords between player and the pickup to prevent from hackers !

      if (nxPlayer) {
        nxPlayer.AddItem(pickup.name, pickup.amount, (resp: Response) => {
          if (resp.ok) {
            this.pickups = this.pickups.filter(
              (pic) => pic.uuid !== pickup.uuid,
            )
            emitNet(ItemsEvents.REMOVE_PICKUP, -1, pickup.uuid)
          }
        })
      }
    } catch (error) {
      ItemsLogger.error(error)
    }
  }

  /**
   * Register an item as usable
   * @param name The name of the item to register.
   * @param cb The callback to execute when the item is used.
   * @example
   * RegisterUsableItem('phone', () => console.log('Item used'))
   */
  @ExportMethod()
  public registerUsableItem(name: string, cb: () => void): void {
    if (typeof cb !== 'function') return

    if (this.usableItems.has(name)) {
      ItemsLogger.warn(
        `item: [${name}] has already being registerd. [MISC.RegisterUsableItem]`,
      )
    }

    this.usableItems.set(name, cb)
  }

  public async useItem(
    name: string,
    source: number,
    ...args: unknown[]
  ): Promise<void> {
    if (!this.usableItems.has(name)) {
      ItemsLogger.error(`Can't use item: ${name} he is not registerd !`)
      return
    }

    const itemCB = this.usableItems.get(name)
    itemCB && itemCB(source, ...args)
  }

  public async createItem(itemData: CreateItemType, cb?: ResponseCB) {
    const res = createItemSchema.safeParse(itemData)

    if (!res.success) {
      cb?.({
        ok: false,
        message: `Invalid data for creating item`,
      })
      return
    }

    const alreadyExist = this.findItem(res.data.name)

    if (alreadyExist) {
      cb?.({
        ok: false,
        message: `Can't create item [${res.data.name}] already exists !`,
      })
      return
    }

    try {
      await this.db.create(res.data)
      this.items.push(res.data)

      emit(ItemsEvents.ITEM_CREATED, res.data)
      cb?.({ ok: true, message: 'item created.', data: res.data })
    } catch (error) {
      cb?.({ ok: false, message: error as any })
    }
  }

  private async init() {
    const res = await this.db.fetchAll()

    for (const i of res) {
      i.data = JSON.parse(i.data as unknown as string)
    }

    this.items = res
  }
}

const ItemsService = new _ItemsService()
export { ItemsService }
