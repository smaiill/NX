import MiscManager from 'c@class/misc'
import ObjectManager from 'c@class/object'
import { ItemsEventsE } from '../../types/events'
import { PickupT } from '../../types/items'
class _ItemsService {
  Pickups: PickupT[]
  pickupAnimation: string
  pickupAnimationDict: string
  constructor() {
    this.Pickups = []
    this.pickupAnimation = 'putdown_low'
    this.pickupAnimationDict = 'pickup_object'
  }

  createDrop(
    name: string,
    amount: number,
    coords: number[],
    uuid: string,
    label: string,
    propsType: string
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
        PlaceObjectOnGroundProperly(object)
        FreezeEntityPosition(object, true)
        SetEntityCollision(object, false, true)

        this.Pickups.push({
          name,
          amount,
          coords,
          uuid,
          object,
          label,
          propsType,
        })

        clearInterval(interval)
      }
    }, 500)
  }

  refreshPickups(pickups: PickupT[]): void {
    pickups.forEach((pickup) => {
      RequestModel(pickup.propsType)
      const interval = setInterval(() => {
        if (HasModelLoaded(pickup.propsType)) {
          const object = CreateObject(
            pickup.propsType,
            pickup.coords[0],
            pickup.coords[1],
            pickup.coords[2],
            false,
            false,
            true
          )
          SetEntityAsMissionEntity(object, true, false)
          FreezeEntityPosition(object, true)
          SetEntityCollision(object, false, true)
          PlaceObjectOnGroundProperly(object)

          this.Pickups.push({
            name: pickup.name,
            amount: pickup.amount,
            coords: pickup.coords,
            uuid: pickup.uuid,
            label: pickup.label,
            propsType: pickup.propsType,
            object,
          })

          clearInterval(interval)
        }
      }, 500)
    })
  }

  handlePickupsPickup(): void {
    // ! I CANT OPTI THIS PART CAUSE OF FIVEM (setTick takes to much :( )) !
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

        // 2- 4 - 8 - 9
        if (distance < 4) {
          MiscManager.drawText3D(pickup.coords, pickup.label, 1, 2)
        }

        if (distance < 1) {
          if (IsControlJustReleased(1, 51)) {
            MiscManager.requestAnim(this.pickupAnimationDict, () => {
              TaskPlayAnim(
                player,
                this.pickupAnimationDict,
                this.pickupAnimation,
                8.0,
                1.0,
                1000,
                16,
                0.0,
                false,
                false,
                false
              )
              RemoveAnimDict(this.pickupAnimationDict)
              setTimeout(() => {
                emitNet(ItemsEventsE.PICKUP_ITEM, pickup.uuid)
              }, 500)
            })
          }
        }
      })
    }, REFRESH_TIME)
  }

  findPickup(uuid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const pickup = this.Pickups.find(
        (pickup) => (pickup.uuid as unknown) === uuid
      )

      if (pickup) {
        return resolve(pickup)
      }

      reject()
    })
  }

  async removePickup(uuid: number): Promise<void> {
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
