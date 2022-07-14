import { ItemsEventsE } from '../../types/events'
import { ItemT } from '../../types/items'
import ItemsService from './items.service'

onNet(ItemsEventsE.DROP_ITEM, (name: string, amount: number) => {
  const source = globalThis.source
  ItemsService.dropItem(name, amount, source)
})

onNet(ItemsEventsE.PICKUP_ITEM, (uuid: string) => {
  const source = globalThis.source
  ItemsService.takePickup(uuid, source)
})

onNet(ItemsEventsE.USE_ITEM, (name: string, ...args: any[]) => {
  const source = globalThis.source
  ItemsService.useItem(name, source, args)
})

onNet(
  ItemsEventsE.CREATE_ITEM,
  ({ name, label, weight, type, props }: ItemT, cb?: Function) => {
    ItemsService.createItem({ name, label, weight, type, props }, cb)
  }
)
