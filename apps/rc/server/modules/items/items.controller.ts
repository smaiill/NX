import { Item, ItemsEvents, ResponseCB } from '@nx/types'
import { getSrc } from '@utils/src'
import { On, OnlyClient, OnNet } from 'decorators/Event'
import { ItemsService } from './items.service'

export class ItemsController {
  @OnlyClient()
  @OnNet(ItemsEvents.DROP_ITEM)
  public handleDropItem(data: { name: string; amount: number }) {
    const src = getSrc()

    ItemsService.dropItem(src, data)
  }

  @OnlyClient()
  @OnNet(ItemsEvents.PICKUP_ITEM)
  public handlePickupItem(uuid: string) {
    const src = getSrc()

    ItemsService.takePickup(uuid, src)
  }

  @OnlyClient()
  @OnNet(ItemsEvents.USE_ITEM)
  public handleUseItem(name: string, ...args: unknown[]) {
    const src = getSrc()

    ItemsService.useItem(name, src, ...args)
  }

  @On(ItemsEvents.CREATE_ITEM)
  public async handleCreateItem(data: Item, cb?: ResponseCB) {
    await ItemsService.createItem(data, cb)
  }
}
