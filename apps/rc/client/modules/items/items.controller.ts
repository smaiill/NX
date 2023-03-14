import { OnNet } from '@decorators/Event'
import { ItemsEvents, Pickup } from '@nx/types'
import { ItemsService } from './items.service'

export class ItemsController {
  @OnNet(ItemsEvents.CREATE_PICKUP)
  public handleCreatePickup({
    name,
    amount,
    coords,
    uuid,
    label,
    propsType,
    itemType,
    _unique,
    maxInSlot,
  }: Pickup) {
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
  }

  @OnNet(ItemsEvents.REMOVE_PICKUP)
  public handleRemovePickup(uuid: string) {
    ItemsService.removePickup(uuid)
  }

  @OnNet(ItemsEvents.CREATE_MISSING_PICKUPS)
  public handleCreateMissingPickups(pickups: Pickup[]) {
    ItemsService.refreshPickups(pickups)
  }
}
