export class _Object {
  constructor() {}

  create(entity: number): void {
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

  delete(entity: number): void {
    if (entity && IsEntityAnObject(entity)) {
      DeleteObject(entity)
    }
  }
}
