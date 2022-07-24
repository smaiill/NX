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
    propsType: string,
    itemType: string
  ): void => {
    ItemsService.createDrop(
      name,
      amount,
      coords,
      uuid,
      label,
      propsType,
      itemType
    )
  }
)

onNet(ItemsEventsE.CREATE_MISSING_PICKUPS, (pickups: PickupT[]): void => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: string): void => {
  ItemsService.removePickup(uuid)
})

onNet(ItemsEventsE.CLEAR_ALL_PICKUPS_C, (uuids: string[]) => {
  for (const uuid of uuids) {
    ItemsService.removePickup(uuid)
  }
})