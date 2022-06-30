class _Object {
  constructor() {}

  create(entity: string): any {
    let object = null
    RequestModel(entity)
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(entity)) {
        const playerPed: number = PlayerPedId()
        const pos: number[] = GetEntityCoords(playerPed, true)
        object = CreateObject(entity, pos[0], pos[1], pos[2], true, false, true)

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

const ObjectManager = new _Object()
export default ObjectManager
