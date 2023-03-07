import { ResponseCB } from '@nx/types'

class _Object {
  public create(entity: string, cb?: ResponseCB): number | void {
    if (!entity || !IsModelValid(entity)) {
      cb?.({
        ok: false,
        message: 'not valid params to create object.',
      })
      return
    }

    RequestModel(entity)
    const i = setInterval(() => {
      if (HasModelLoaded(entity)) {
        const playerPed = PlayerPedId()
        const pos = GetEntityCoords(playerPed, true)
        const object = CreateObject(
          entity,
          pos[0],
          pos[1],
          pos[2],
          true,
          false,
          true,
        )
        clearInterval(i)
        SetEntityAsNoLongerNeeded(entity as unknown as number)
        SetModelAsNoLongerNeeded(entity)
        cb?.({
          ok: true,
          data: object,
        })
      }
    }, 0)
  }

  public delete(entity: number, cb?: ResponseCB): void {
    if (!entity) return

    SetEntityAsMissionEntity(entity, false, true)
    DeleteObject(entity)

    cb?.({
      ok: true,
      message: 'object deleted.',
    })
  }
}

export default new _Object()
