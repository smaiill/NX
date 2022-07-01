import { ItemsEventsE } from '../../types/events'
import MiscManager from '../class/misc'
import ObjectManager from '../class/object'

class _ItemsService {
  Pickups: any[]
  defaultModel: string
  constructor() {
    this.Pickups = []
    this.defaultModel = 'v_serv_abox_02'
  }

  createDrop(
    name: string,
    amount: number,
    coords: number[],
    uuid: string,
    label: string
  ): void {
    RequestModel(this.defaultModel)
    const interval = setInterval(() => {
      if (HasModelLoaded(this.defaultModel)) {
        const object = CreateObject(
          this.defaultModel,
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
        })

        clearInterval(interval)
      }
    }, 500)
  }

  refreshPickups(pickups: any[]): void {
    pickups.forEach((pickup) => {
      RequestModel(this.defaultModel)
      const interval = setInterval(() => {
        if (HasModelLoaded(this.defaultModel)) {
          const object = CreateObject(
            this.defaultModel,
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
            object,
          })

          clearInterval(interval)
        }
      }, 500)
    })
  }

  handlePickupsPickup(): void {
    // ! I CANT OPTI THIS PART CAUSE OF FIVEM !
    const REFRESH_TIME = 50_000
    const player = PlayerPedId()

    setInterval(() => {
      const coords = GetEntityCoords(player, false)
      this.Pickups.forEach((pickup) => {
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
          MiscManager.drawText3D(pickup.coords, pickup.label)
        }

        if (distance < 4) {
          if (IsControlJustReleased(1, 51)) {
            emitNet(ItemsEventsE.PICKUP_ITEM, pickup.uuid)
          }
        }
      })
    })
  }

  findPickup(uuid: number): Promise<any> {
    return new Promise((res, rej) => {
      const pickup = this.Pickups.find((pickup) => pickup.uuid === uuid)

      if (pickup) {
        return res(pickup)
      }

      rej()
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
