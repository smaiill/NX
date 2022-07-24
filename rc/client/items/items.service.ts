import MiscManager from 'c@class/misc'
import ObjectManager from 'c@class/object'
import { ItemsEventsE } from '../../types/events'
import { PickupT } from '../../types/items'
class _ItemsService {
  private Pickups: PickupT[]
  private readonly pickupAnimation: { name: string; dict: string }
  constructor() {
    this.Pickups = []
    this.pickupAnimation = { name: 'putdown_low', dict: 'pickup_object' }
  }

  public createDrop(
    name: string,
    amount: number,
    coords: number[],
    uuid: string,
    label: string,
    propsType: string,
    itemType: string
  ): void {
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
      }
    }, 500)
  }

  public refreshPickups(pickups: PickupT[]): void {
    pickups.forEach((pickup) => {
      this.createDrop(
        pickup.name,
        pickup.amount,
        pickup.coords,
        pickup.uuid as string,
        pickup.label,
        pickup.propsType,
        pickup.itemType
      )
    })
  }

  public handlePickupsPickup(): void {
    // ! IM GONNA OPTI DONT PANIC !!!!!!!!
    let REFRESH_TIME = 0

    setInterval(() => {
      const player: number = PlayerPedId()
      const coords: number[] = GetEntityCoords(player, false)
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
            MiscManager.requestAnim(this.pickupAnimation.dict, () => {
              TaskPlayAnim(
                player,
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
            })
          }
        }
      })
    }, REFRESH_TIME)
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
    if (pickup) {
      ObjectManager.delete(pickup.object, () => {
        this.Pickups = this.Pickups.filter((pic) => pic.uuid !== pickup.uuid)
      })
    }
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
