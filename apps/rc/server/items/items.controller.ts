import { Item, ItemsEvents, ResponseCB } from '@nx/types'
import { ItemsService } from './items.service'

// ? Only from client side
onNet(ItemsEvents.DROP_ITEM, (name: string, amount: number): void => {
  const source = globalThis.source
  if (!source) return
  ItemsService.dropItem(name, amount, source)
})

// ? Only from client side
onNet(ItemsEvents.PICKUP_ITEM, (uuid: string): void => {
  const source = globalThis.source
  if (!source || !uuid) return
  ItemsService.takePickup(uuid, source)
})

// ? Only Client side.
onNet(ItemsEvents.USE_ITEM, (name: string, ...args: any[]): void => {
  const source = globalThis.source
  ItemsService.useItem(name, source, args)
})

// ? Only Server side.
on(
  ItemsEvents.CREATE_ITEM,
  (
    { name, label, weight, type, props, data, unique, maxInSlot }: Item,
    cb?: ResponseCB
  ): void => {
    ItemsService.createItem(
      { name, label, weight, type, props, data, unique, maxInSlot },
      cb
    )
  }
)
