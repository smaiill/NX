import { Item, ItemsEvents, ResponseCB } from '@nx/types'
import { LG } from '@utils/logger'
import { isRPCFromClientSide } from '@utils/src'
import { ItemsService } from './items.service'

// ? Only from client side
onNet(ItemsEvents.DROP_ITEM, (data: { name: string; amount: number }): void => {
  const src = isRPCFromClientSide()

  if (!src) {
    LG.warn(
      `someone tried to drop item from server side, info provided: [${data}]`
    )
    return
  }

  ItemsService.dropItem(src, data)
})

// ? Only from client side
onNet(ItemsEvents.PICKUP_ITEM, (uuid: string): void => {
  const src = isRPCFromClientSide()

  if (!src) {
    LG.warn(
      `someone tried to pickup item from server side, info provided: ${{
        uuid,
      }}`
    )
    return
  }

  ItemsService.takePickup(uuid, src)
})

// ? Only Client side.
onNet(ItemsEvents.USE_ITEM, (name: string, ...args: any[]): void => {
  const src = isRPCFromClientSide()

  if (!src) {
    LG.warn(
      `someone tried to use item from server side, info provided: ${{
        ...args,
      }}`
    )
    return
  }

  ItemsService.useItem(name, src, ...args)
})

// ? Only Server side.
on(ItemsEvents.CREATE_ITEM, (data: Item, cb?: ResponseCB): void => {
  const src = isRPCFromClientSide()

  if (src) {
    LG.warn(
      `someone tried to create item from client side, info provided: ${data}`
    )
    return
  }

  ItemsService.createItem(data, cb)
})
