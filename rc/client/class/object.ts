import logger from 'c@utils/logger'

class _Object {
  constructor() {}

  public create(entity: string, cb?: Function): number | void {
    if (!entity) {
      return logger.error('not valid params to create object. [Objects.Create]')
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Objects.Create].')
    }

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

        cb && cb(object)
      }
    })
  }

  public delete(entity: number, cb?: Function): void {
    if (!entity || typeof entity !== 'number') {
      return
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Objects.Delete].')
    }

    SetEntityAsMissionEntity(entity, false, true)
    DeleteObject(entity)

    cb && cb()
  }
}

const ObjectManager = new _Object()
export default ObjectManager
