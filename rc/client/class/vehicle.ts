export class _Vehicle {
  RandomVehicles: string[]
  constructor() {
    this.RandomVehicles = [
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

  create(model: string): any {
    RequestModel(model)
    if (!IsModelAVehicle(model)) return
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

        return vehicle
        clearInterval(i)
      }
    }, 500)
  }

  delete() {
    const playerPed: number = PlayerPedId()
    if (IsPedInAnyVehicle(playerPed, true)) {
      const vehicle: number = GetVehiclePedIsIn(playerPed, true)
      SetEntityAsMissionEntity(vehicle, false, true)
      DeleteVehicle(vehicle)
    }
  }

  repair(vehicle?: number): void {
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

  async random() {
    const ped: number = PlayerPedId()
    const randomCar: string =
      this.RandomVehicles[
        Math.floor(Math.random() * this.RandomVehicles.length)
      ]
    const vehicle = await this.create(randomCar)
    const randomColor: number = Math.floor(Math.random() * 159)
    const randomColor2: number = Math.floor(Math.random() * 159)
    SetVehicleColours(vehicle, randomColor, randomColor2)
  }
}

const VehicleManager = new _Vehicle()
export default VehicleManager
