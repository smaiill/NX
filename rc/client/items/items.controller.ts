import { ItemsEventsE } from '../../types/events'
import { PickupT } from '../../types/items'

import ItemsService from './items.service'

onNet(
  ItemsEventsE.CREATE_PICKUP,
  (
    name: string,
    amount: number,
    coords: number[],
    uuid: string,
    label: string,
    propsType: string
  ) => {
    ItemsService.createDrop(name, amount, coords, uuid, label, propsType)
  }
)

onNet(ItemsEventsE.CREATE_MISSING_PICKUPS, (pickups: PickupT[]) => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: number) => {
  ItemsService.removePickup(uuid)
})
