class Vehicle {
  constructor() {}

  Spawn(model: string) {
    RequestModel(model)
    if (!IsModelAVehicle(model)) return
    let i = setInterval(() => {
      if (HasModelLoaded(model)) {
        let playerPed = PlayerPedId()
        let pos = GetEntityCoords(playerPed, true)
        let vehicle = CreateVehicle(
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

  // NAF.Vehicles.Delete()

//   Delete() {
//     if (IsPedInVehicle()) {
//     }
//   }
}
