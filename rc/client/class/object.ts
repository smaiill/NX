class _Object {
  constructor() {}

  create(entity: string, cb: Function): any {
    RequestModel(entity)
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(entity)) {
        const playerPed: number = PlayerPedId()
        const pos: number[] = GetEntityCoords(playerPed, true)
        const object = CreateObject(
          entity,
          pos[0],
          pos[1],
          pos[2],
          true,
          false,
          true
        )
        clearInterval(i)

        if (cb && typeof cb === 'function') {
          cb(object)
        }
      }
    })
  }

  delete(entity: number, cb: Function): void {
    if (entity && IsEntityAnObject(entity)) {
      DeleteObject(entity)

      if (cb && typeof cb === 'function') {
        cb()
      }
    }
  }
}

const ObjectManager = new _Object()
export default ObjectManager
