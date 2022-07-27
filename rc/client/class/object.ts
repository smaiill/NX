import logger from 'c@utils/logger'
import { RespCB } from '../../types/main'

class _Object {
  constructor() {}

  public create(entity: string, cb?: RespCB): number | void {
    if (!entity) {
      cb &&
        cb({
          status: 'error',
          message: 'not valid params to create object.',
        })
      return
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

        cb &&
          cb({
            status: 'succes',
            data: object,
          })
      }
    })
  }

  public delete(entity: number, cb?: RespCB): void {
    if (!entity || typeof entity !== 'number') {
      return
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Objects.Delete].')
    }

    SetEntityAsMissionEntity(entity, false, true)
    DeleteObject(entity)

    cb &&
      cb({
        status: 'succes',
        message: 'Object deleted.',
      })
  }
}

const ObjectManager = new _Object()
export default ObjectManager
