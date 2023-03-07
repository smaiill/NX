import { ItemsEvents, Pickup } from '@nx/types'
import { ItemsService } from './items.service'

on(
  ItemsEvents.GET_ALL_CLIENT_PICKUPS,
  async (returnEventName: string): Promise<void> => {
    if (!returnEventName) {
      return
    }
    const pickups = await ItemsService.getAllPickups()
    emit(returnEventName, pickups)
  },
)

// server -> client.
onNet(
  ItemsEvents.CREATE_PICKUP,
  ({
    name,
    amount,
    coords,
    uuid,
    label,
    propsType,
    itemType,
    _unique,
    maxInSlot,
  }: Pickup): void => {
    ItemsService.createDrop({
      name,
      amount,
      coords,
      uuid: uuid as string,
      label,
      propsType,
      itemType,
      _unique,
      maxInSlot,
    })
  },
)

onNet(ItemsEvents.CREATE_MISSING_PICKUPS, (pickups: Pickup[]): void => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEvents.REMOVE_PICKUP, (uuid: string): void => {
  ItemsService.removePickup(uuid)
})
