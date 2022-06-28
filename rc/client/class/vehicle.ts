export class _Vehicle {
  constructor() {}

  Create(model: string) {
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
      }
    }, 500)
  }

  Delete(ped: number) {
    if (ped && typeof ped === 'number' && IsPedInAnyVehicle(ped, true)) {
      DeleteVehicle(GetVehiclePedIsIn(ped, true))
    }
  }

  Repair(vehicle?: number) {
    const playerPed = PlayerPedId()
    if (!vehicle || !IsEntityAVehicle(vehicle)) {
      const vehicle = GetVehiclePedIsIn(playerPed, true)
      if (vehicle) {
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
      }
      return
    }
    SetVehicleFixed(vehicle)
    SetVehicleDeformationFixed(vehicle)
    SetVehicleUndriveable(vehicle, false)
  }

  Random() {}
}
