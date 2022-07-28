import { ItemsEventsE } from '../../types/events'
import { PickupT } from '../../types/items'
import ItemsService from './items.service'

// server -> client.
onNet(
  ItemsEventsE.CREATE_PICKUP,
  ({
    name,
    amount,
    coords,
    uuid,
    label,
    propsType,
    itemType,
  }: PickupT): void => {
    ItemsService.createDrop({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
    })
  }
)

onNet(ItemsEventsE.CREATE_MISSING_PICKUPS, (pickups: PickupT[]): void => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: string): void => {
  ItemsService.removePickup(uuid)
})

onNet(ItemsEventsE.CLEAR_ALL_PICKUPS_C, (uuids: string[]): void => {
  for (const uuid of uuids) {
    ItemsService.removePickup(uuid)
  }
})
