import { RespCB, RespT } from '../../types/main'

class _Vehicle {
  private readonly MAXIMUM_COLOR_VEHICLES: number
  private readonly randomVehicles: ReadonlyArray<string>
  constructor() {
    this.MAXIMUM_COLOR_VEHICLES = 150
    this.randomVehicles = [
      'asbo',
      'blista',
      'panto',
      'sentinel',
      'jackal',
      'akuma',
      'bf400',
      'dominator',
      'imperator',
      'balle',
      'mesa',
    ]
  }

  public create(model: string | number, cb: RespCB): number | void {
    if (!model || !IsModelAVehicle(model)) {
      cb &&
        cb({
          status: 'error',
          message: 'not valid params to create vehicle.',
        })
      return
    }

    RequestModel(model)
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(model)) {
        const playerPed: number = PlayerPedId()
        const pos: number[] = GetEntityCoords(playerPed, true)
        const vehicle: number = CreateVehicle(
          model,
          pos[0],
          pos[1],
          pos[2],
          GetEntityHeading(playerPed),
          true,
          false
        )
        SetPedIntoVehicle(playerPed, vehicle, -1)

        SetEntityAsNoLongerNeeded(vehicle)
        SetModelAsNoLongerNeeded(model)

        clearInterval(i)

        cb &&
          cb({
            status: 'succes',
            data: vehicle,
          })
      }
    }, 500)
  }

  public delete(cb?: RespCB): void {
    const playerPed: number = PlayerPedId()
    if (IsPedInAnyVehicle(playerPed, true)) {
      const vehicle: number = GetVehiclePedIsIn(playerPed, true)
      SetEntityAsMissionEntity(vehicle, false, true)
      DeleteVehicle(vehicle)

      cb &&
        cb({
          status: 'succes',
          message: 'vehicle deleted.',
        })
    }
  }

  public repair(vehicle?: number): void {
    const playerPed = PlayerPedId()
    if (!vehicle || !IsEntityAVehicle(vehicle)) {
      const vehicle: number = GetVehiclePedIsIn(playerPed, true)
      if (vehicle) {
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
        SetVehicleDirtLevel(vehicle, 0.0)
        WashDecalsFromVehicle(vehicle, 1.0)
      }
      return
    }
    SetVehicleFixed(vehicle)
    SetVehicleDeformationFixed(vehicle)
    SetVehicleUndriveable(vehicle, false)
  }

  public random(): void {
    const randomCar: string =
      this.randomVehicles[
        Math.floor(Math.random() * this.randomVehicles.length)
      ]
    this.create(randomCar, (resp: RespT) => {
      if (resp.status !== 'succes') return
      const randomColor: number = Math.floor(
        Math.random() * this.MAXIMUM_COLOR_VEHICLES
      )
      const randomColor2: number = Math.floor(
        Math.random() * this.MAXIMUM_COLOR_VEHICLES
      )
      SetVehicleColours(resp.data, randomColor, randomColor2)
    })
  }
}

const VehicleManager = new _Vehicle()
export default VehicleManager
