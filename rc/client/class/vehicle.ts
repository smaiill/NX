import logger from 'c@utils/logger'

export class _Vehicle {
  RandomVehicles: ReadonlyArray<string> = [
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
  constructor() {}

  public create(model: string | number, cb: Function): number | void {
    if (!model || (typeof model !== 'string' && typeof model !== 'number')) {
      return logger.error(
        'not valid params to create vehicle. [Vehicle.Create]'
      )
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Vehicles.Create].')
    }

    if (!IsModelAVehicle(model)) {
      return logger.error('model provided is not a vehicle. [Vehicles.Create].')
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

        cb && cb(vehicle)
      }
    }, 500)
  }

  public delete(cb?: Function): void {
    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Vehicles.Delete].')
    }

    const playerPed: number = PlayerPedId()
    if (IsPedInAnyVehicle(playerPed, true)) {
      const vehicle: number = GetVehiclePedIsIn(playerPed, true)
      SetEntityAsMissionEntity(vehicle, false, true)
      DeleteVehicle(vehicle)

      cb && cb()
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

  public async random(): Promise<void> {
    const randomCar: string =
      this.RandomVehicles[
        Math.floor(Math.random() * this.RandomVehicles.length)
      ]
    this.create(randomCar, (vehicle: number) => {
      const randomColor: number = Math.floor(Math.random() * 159)
      const randomColor2: number = Math.floor(Math.random() * 159)
      SetVehicleColours(vehicle, randomColor, randomColor2)
    })
  }
}

const VehicleManager = new _Vehicle()
export default VehicleManager
