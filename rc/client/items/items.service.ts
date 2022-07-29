import { ItemsEventsE } from '../../types/events'
import { PickupT } from '../../types/items'
import { RespT } from '../../types/main'
import Player from '../player/player.class'
import MiscManager from 'c@class/misc'
import ObjectManager from 'c@class/object'

class _ItemsService {
  private Pickups: PickupT[]
  private readonly pickupAnimation: { name: string; dict: string }
  private readonly REFRESH_TIME: number
  constructor() {
    this.Pickups = []
    this.pickupAnimation = { name: 'putdown_low', dict: 'pickup_object' }
    this.REFRESH_TIME = 0
  }

  public createDrop({
    name,
    amount,
    coords,
    uuid,
    label,
    propsType,
    itemType,
  }: PickupT): void {
    RequestModel(propsType)
    const interval: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(propsType)) {
        const object = CreateObject(
          propsType,
          coords[0],
          coords[1],
          coords[2],
          false,
          false,
          true
        )
        SetEntityAsMissionEntity(object, true, false)
        SetEntityCollision(object, false, true)
        PlaceObjectOnGroundProperly(object)

        if (itemType === 'gun') {
          SetEntityRotation(object, 90.0, 0, 0.0, 2, true)
        }

        this.Pickups.push({
          name,
          amount,
          coords,
          uuid,
          object,
          label,
          propsType,
          itemType,
        })

        clearInterval(interval)
        SetModelAsNoLongerNeeded(propsType)
        SetEntityAsNoLongerNeeded(propsType as unknown as number)
      }
    }, 0)
  }

  public refreshPickups(pickups: PickupT[]): void {
    for (const pickup of pickups) {
      this.createDrop({
        name: pickup.name,
        amount: pickup.amount,
        coords: pickup.coords,
        uuid: pickup.uuid as string,
        label: pickup.label,
        propsType: pickup.propsType,
        itemType: pickup.itemType,
      })
    }
  }

  public handlePickupsPickup(): void {
    // ! IM GONNA OPTI DONT PANIC !!!!!!!!
    setInterval(() => {
      const playerPed: number = PlayerPedId()
      Player.setValue('ped', playerPed)
      const coords: number[] = GetEntityCoords(playerPed, false)
      this.Pickups.forEach((pickup: PickupT) => {
        const distance = GetDistanceBetweenCoords(
          coords[0],
          coords[1],
          coords[2],
          pickup.coords[0],
          pickup.coords[1],
          pickup.coords[2],
          true
        )
        if (distance < 4) {
          MiscManager.drawText3D(pickup.coords, pickup.label, 1, 2)
        }

        if (distance < 1) {
          if (IsControlJustReleased(1, 51)) {
            MiscManager.requestAnim(
              this.pickupAnimation.dict,
              (resp: RespT) => {
                if (resp.status === 'succes') {
                  TaskPlayAnim(
                    playerPed,
                    this.pickupAnimation.dict,
                    this.pickupAnimation.name,
                    8.0,
                    1.0,
                    1000,
                    16,
                    0.0,
                    false,
                    false,
                    false
                  )
                  RemoveAnimDict(this.pickupAnimation.dict)
                  setTimeout(() => {
                    emitNet(ItemsEventsE.PICKUP_ITEM, pickup.uuid)
                  }, 250)
                }
              }
            )
          }
        }
      })
    }, this.REFRESH_TIME)
  }

  private findPickup(uuid: string): Promise<PickupT | void> {
    return new Promise((resolve, reject) => {
      const pickup = this.Pickups.find((pickup) => pickup.uuid === uuid)

      if (pickup) {
        return resolve(pickup)
      }

      reject()
    })
  }

  public async removePickup(uuid: string): Promise<void> {
    const pickup = await this.findPickup(uuid)

    if (!pickup) return

    ObjectManager.delete(pickup.object, () => {
      this.Pickups = this.Pickups.filter((pic) => pic.uuid !== pickup.uuid)
    })
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
