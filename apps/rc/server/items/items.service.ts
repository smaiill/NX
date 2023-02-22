import { Item, ItemsEvents, Pickup, Response, ResponseCB } from '@nx/types'
import { PlayerService } from '@player/player.service'
import { items } from '@shared/load.file'
import { Utils } from '@shared/utils/misc'
import { LG } from '@utils/logger'

class _ItemsService {
  private readonly items: Item[]
  private pickups: Pickup[]
  private usableItems: Map<string, Function>
  constructor() {
    this.items = items
    this.pickups = []
    this.usableItems = new Map()
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
    unique: boolean,
    maxInSlot: number
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
      unique,
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
      unique,
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
    { amount, name }: { amount: number; name: string }
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
      itemInfo.props
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
        itemInfo.unique,
        itemInfo.maxInSlot
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
              (pic) => pic.uuid !== pickup.uuid
            )
            emitNet(ItemsEvents.REMOVE_PICKUP, -1, pickup.uuid)
          }
        })
      }
    } catch (error) {
      LG.error(error)
    }
  }

  public registerUsableItem(name: string, cb: Function): void {
    if (!cb || typeof cb !== 'function') {
      LG.error('function callback most be provided. [Misc.RegisterUsableItem]')
      return
    }

    if (this.usableItems.has(name)) {
      LG.warn(
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
      LG.error(`Can't use item: ${name} he is not registerd !`)
      return
    }

    const itemCB = this.usableItems.get(name)
    itemCB && itemCB(source, ...args)
  }

  public createItem(
    {
      name,
      label,
      weight,
      type,
      props = 'prop_cs_cardbox_01',
      data,
      unique,
      maxInSlot,
    }: Item,
    cb?: ResponseCB
  ) {
    const itemData = {
      name,
      label,
      weight,
      type,
      props,
      data,
      maxInSlot,
      unique,
    }

    if (!name || !label || !weight || !type || typeof weight !== 'number') {
      cb?.({
        ok: false,
        message: "Can't create item invalid arguments provided !",
      })
      return
    }

    itemData.unique = itemData.unique ?? false

    !itemData.maxInSlot && (itemData.maxInSlot = 100)

    unique && (itemData.maxInSlot = 1)

    const alreadyExist = this.findItem(itemData.name)

    if (alreadyExist) {
      cb?.({
        ok: false,
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
      emit(ItemsEvents.ITEM_CREATED, itemData)
      cb?.({ ok: true, message: 'item created.', data })
    } catch (error) {
      cb?.({ ok: false, message: error as any })
    }
  }
}

const ItemsService = new _ItemsService()
export { ItemsService }
