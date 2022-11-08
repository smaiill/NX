import { ItemsEventsE } from '../../../types/events'
import { PickupT } from '../../../types/items'
import ItemsService from './items.service'

on(
  ItemsEventsE.GET_ALL_CLIENT_PICKUPS,
  async (returnEventName: string): Promise<void> => {
    if (!returnEventName) {
      return
    }
    const pickups = await ItemsService.getAllPickups()
    emit(returnEventName, pickups)
  }
)

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
    unique,
    maxInSlot,
  }: PickupT): void => {
    ItemsService.createDrop({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
      unique,
      maxInSlot,
    })
  }
)

onNet(ItemsEventsE.CREATE_MISSING_PICKUPS, (pickups: PickupT[]): void => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: string): void => {
  ItemsService.removePickup(uuid)
})
