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

  create(model: string): Promise<any> {
    return new Promise((resolve, reject) => {
      RequestModel(model)
      if (!IsModelAVehicle(model)) return
      const i = setInterval(() => {
        if (HasModelLoaded(model)) {
          const playerPed = PlayerPedId()
          const pos = GetEntityCoords(playerPed, true)
          const vehicle = CreateVehicle(
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
          return resolve(vehicle)
        }
      }, 500)
    })
  }

  delete() {
    const playerPed = PlayerPedId()
    if (IsPedInAnyVehicle(playerPed, true)) {
      const vehicle = GetVehiclePedIsIn(playerPed, true)
      SetEntityAsMissionEntity(vehicle, false, true)
      DeleteVehicle(vehicle)
    }
  }

  repair(vehicle?: number): void {
    const playerPed = PlayerPedId()
    if (!vehicle || !IsEntityAVehicle(vehicle)) {
      const vehicle = GetVehiclePedIsIn(playerPed, true)
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
    const ped = PlayerPedId()
    const randomCar =
      this.RandomVehicles[
        Math.floor(Math.random() * this.RandomVehicles.length)
      ]
    const vehicle = await this.create(randomCar)
    const randomColor = Math.floor(Math.random() * 159)
    const randomColor2 = Math.floor(Math.random() * 159)
    SetVehicleColours(vehicle, randomColor, randomColor2)
  }
}
