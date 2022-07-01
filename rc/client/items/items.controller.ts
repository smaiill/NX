import { ItemsEventsE } from '../../types/events'
import ItemsService from './items.service'

onNet(
  ItemsEventsE.CREATE_PICKUP,
  (
    name: string,
    amount: number,
    coords: number[],
    uuid: string,
    label: string
  ) => {
    ItemsService.createDrop(name, amount, coords, uuid, label)
  }
)

onNet(ItemsEventsE.CREATE_MISSING_PICKUPS, (pickups: any[]) => {
  ItemsService.refreshPickups(pickups)
})

onNet(ItemsEventsE.REMOVE_PICKUP, (uuid: number) => {
  ItemsService.removePickup(uuid)
})
