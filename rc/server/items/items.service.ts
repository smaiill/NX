import PlayerService from 's@player/player.service'
import { items } from '@shared/load.file'
import Utils from '@shared/utils/misc'
import { logger } from 's@utils/logger'
import { ItemsEventsE } from '../../types/events'
import { ItemT, PickupT } from '../../types/items'
import { RespCB } from '../../types/main'

export class _ItemsService {
  private Items: ItemT[]
  private Pickups: PickupT[]
  private UsableItems: Map<string, Function>
  private utils: typeof Utils
  constructor() {
    this.Items = items
    this.Pickups = []
    this.UsableItems = new Map()
    this.utils = Utils
  }

  public isValidItem(itemName: string): false | ItemT {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) return false

    return item
  }

  public getItemWeight(itemName: string): number {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) {
      return 0
    }

    return item.weight
  }

  public getItemType(name: string): string | null {
    const item = this.isValidItem(name)

    if (item) {
      return item.type
    }

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
    this.Pickups.push({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
    })

    emitNet(
      ItemsEventsE.CREATE_PICKUP,
      -1,
      name,
      amount,
      coords,
      uuid,
      label,
      propsType,
      itemType
    )
  }

  private findItem(name: string): false | ItemT {
    const item = this.Items.find((item) => item.name === name)

    if (item) {
      return item
    }

    return false
  }

  private getPropsToCreate(name: string, amount: number, def: string) {
    let props = def

    if (name === 'money') {
      switch (true) {
        case amount >= 7_500 && amount < 30_000:
          {
            props = 'prop_cash_case_02'
          }
          break
        case amount >= 30_000:
          {
            props = 'prop_cash_crate_01'
          }
          break
      }
    }

    return props
  }

  public async dropItem(
    name: string,
    amount: number,
    source: number
  ): Promise<void> {
    const nxPlayer = await PlayerService.getPlayer(source)

    if (nxPlayer) {
      const itemInfo = await this.findItem(name)
      if (itemInfo) {
        itemInfo.label = itemInfo.label.toLowerCase()
        const label = `~s~${itemInfo.label} ~g~${amount}`
        const propsToCreate = await this.getPropsToCreate(
          name,
          amount,
          itemInfo.props
        )
        nxPlayer.RemoveItem(name, amount, () => {
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
    }
  }

  public createMissingPickups(source: number): void {
    if (this.Pickups.length > 0) {
      emitNet(ItemsEventsE.CREATE_MISSING_PICKUPS, source, this.Pickups)
    }
  }

  private findPickupById(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pickup = this.Pickups.find((pickup) => pickup.uuid === uuid)

      if (pickup) {
        return resolve(pickup)
      }

      reject('')
    })
  }

  public async takePickup(uuid: string, source: number): Promise<void> {
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

  public registerUsableItem(name: string, cb: Function): void {
    if (!cb || typeof cb !== 'function') {
      logger.error(
        'function callback most be provided. [Misc.RegisterUsableItem]'
      )
      return
    }

    if (this.UsableItems.has(name)) {
      logger.warn(
        `item: [${name}] has already being registerd. [MISC.RegisterUsableItem]`
      )
    }

    this.UsableItems.set(name, cb)
  }

  public async useItem(
    name: string,
    source: number,
    ...args: any[]
  ): Promise<void> {
    if (!this.UsableItems.has(name)) {
      logger.error(`can't use item: ${name} he is not registerd.`)
      return
    }

    const itemCB = this.UsableItems.get(name)
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
      this.Items.push(data)
      emitNet(ItemsEventsE.ITEM_CREATED, data)
      cb && cb({ status: 'succes', message: 'item created.', data })
    } catch (error) {
      cb && cb({ status: 'error', message: error as any })
    }
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
