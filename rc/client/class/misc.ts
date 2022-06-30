export class _Misc {
  constructor() {}

  createPed(pedType: string, model: string, cb: Function) {
    RequestModel(model)
    if (!IsModelAPed(model)) return
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(model)) {
        const playerPed: number = PlayerPedId()
        const pos: number[] = GetEntityCoords(playerPed, true)
        const ped: number = CreatePed(
          pedType as unknown as number,
          model,
          pos[0],
          pos[1],
          pos[2],
          GetEntityHeading(playerPed),
          true,
          false
        )
        clearInterval(i)

        if (cb && typeof cb === 'function') {
          cb(ped)
        }
      }
    }, 500)
  }
}

const MiscManager = new _Misc()
export default MiscManager
