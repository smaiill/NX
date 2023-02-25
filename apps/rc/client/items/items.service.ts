import MiscManager from '@class/misc'
import ObjectManager from '@class/object'
import { ItemsEvents, Pickup, Response } from '@nx/types'
import { PlayerCache } from '../player/player.class'

class _ItemsService {
  private Pickups: Pickup[]
  private NearbyPickups: Pickup[]
  private readonly pickupAnimation: { name: string; dict: string }
  private readonly REFRESH_TIME: number
  constructor() {
    this.Pickups = []
    this.NearbyPickups = []
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
    _unique,
    maxInSlot,
  }: Pickup): void {
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
          _unique,
          maxInSlot,
        })

        clearInterval(interval)
        SetModelAsNoLongerNeeded(propsType)
        SetEntityAsNoLongerNeeded(propsType as unknown as number)
      }
    }, 0)
  }

  public refreshPickups(pickups: Pickup[]): void {
    for (const pickup of pickups) {
      this.createDrop({
        name: pickup.name,
        amount: pickup.amount,
        coords: pickup.coords,
        uuid: pickup.uuid as string,
        label: pickup.label,
        propsType: pickup.propsType,
        itemType: pickup.itemType,
        _unique: pickup._unique,
        maxInSlot: pickup.maxInSlot,
      })
    }
  }

  public handlePickupsPickup(): void {
    // ! IM GONNA OPTI DONT PANIC !!!!!!!!
    setInterval(() => {
      const playerPed: number = PlayerPedId()
      PlayerCache.setValue('ped', playerPed)
      const coords: number[] = GetEntityCoords(playerPed, false)
      this.Pickups.forEach((pickup: Pickup) => {
        const distance = GetDistanceBetweenCoords(
          coords[0],
          coords[1],
          coords[2],
          pickup.coords[0],
          pickup.coords[1],
          pickup.coords[2],
          true
        )

        if (distance < 3) {
          MiscManager.drawText3D(pickup.coords, pickup.label, 1, 2)
        }

        if (distance < 3) {
          if (IsControlJustReleased(1, 51)) {
            MiscManager.requestAnim(
              this.pickupAnimation.dict,
              (resp: Response) => {
                if (resp.ok) {
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
                    emitNet(ItemsEvents.PICKUP_ITEM, pickup.uuid)
                  }, 250)
                }
              }
            )
          }
        }
      })
    }, this.REFRESH_TIME)
  }

  private async findPickup(uuid: string): Promise<Pickup | void> {
    const pickup = this.Pickups.find((pickup) => pickup.uuid === uuid)

    if (!pickup) throw 'no pickup'

    return pickup
  }

  public async getAllPickups() {
    return this.Pickups
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
export { ItemsService }
