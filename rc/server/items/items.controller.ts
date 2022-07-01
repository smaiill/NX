import { ItemsEventsE } from '../../types/events'
import ItemsService from './items.service'

onNet(ItemsEventsE.DROP_ITEM, (name: string, amount: number) => {
  const source = globalThis.source
  ItemsService.dropItem(name, amount, source)
})

onNet(ItemsEventsE.PICKUP_ITEM, (uuid: string) => {
  const source = globalThis.source
  ItemsService.takePickup(uuid, source)
})
