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

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: number): void => {
  ItemsService.removePickup(uuid)
})

on(ItemsEventsE.HANDLE_PICKUPS, () => {})
