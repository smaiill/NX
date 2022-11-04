import { ItemsEventsE } from '../../../types/events'
import { ItemT } from '../../../types/items'
import { RespCB } from '../../../types/main'
import ItemsService from './items.service'

// ? Only from client side
onNet(ItemsEventsE.DROP_ITEM, (name: string, amount: number): void => {
  const source = globalThis.source
  if (!source) return
  ItemsService.dropItem(name, amount, source)
})

// ? Only from client side
onNet(ItemsEventsE.PICKUP_ITEM, (uuid: string): void => {
  const source = globalThis.source
  if (!source || !uuid) return
  ItemsService.takePickup(uuid, source)
})

// ? Only Client side.
onNet(ItemsEventsE.USE_ITEM, (name: string, ...args: any[]): void => {
  const source = globalThis.source
  ItemsService.useItem(name, source, args)
})

// ? Only Server side.
on(
  ItemsEventsE.CREATE_ITEM,
  ({ name, label, weight, type, props, data }: ItemT, cb?: RespCB): void => {
    ItemsService.createItem({ name, label, weight, type, props, data }, cb)
  }
)
