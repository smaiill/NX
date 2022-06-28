export class _Object {
  constructor() {}

  Create(entity: number) {
    if (!IsEntityAnObject(entity)) return
    RequestModel(entity)
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(entity)) {
        let playerPed: number = PlayerPedId()
        let pos: number[] = GetEntityCoords(playerPed, true)
        let object: number = CreateObject(
          entity,
          pos[0],
          pos[1],
          pos[2],
          true,
          false,
          true
        )

        clearInterval(i)
      }
    })
  }

  Delete(entity: number) {
    if (entity && IsEntityAnObject(entity)) {
      DeleteObject(entity)
    }
  }
}
