import logger from '../utils/logger'

export class _Misc {
  constructor() {}

  createPed(pedType: string, model: string, cb: Function): (number | void) {
    if (!pedType || !model) {
      return logger.error('not valid params to draw create ped.')
    }
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

  drawText3D(
    coords: number[],
    text: string,
    size: number = 1,
    font: number = 0
  ): void {
    if (!coords || !text) {
      return logger.error('not valid params to draw 3D text.')
    }
    const camCoords = GetFinalRenderedCamCoord()
    const distance = GetDistanceBetweenCoords(
      coords[0],
      coords[1],
      coords[2],
      camCoords[0],
      camCoords[1],
      camCoords[2],
      true
    )

    let scale = (size / distance) * 2
    const fov = (1 / GetGameplayCamFov()) * 100
    scale = scale * fov

    SetTextScale(0.0 * scale, 0.55 * scale)
    SetTextFont(font)
    SetTextColour(255, 255, 255, 215)
    BeginTextCommandDisplayText('STRING')
    SetTextCentre(true)
    AddTextComponentSubstringPlayerName(text)
    SetDrawOrigin(coords[0], coords[1], coords[2], 0)
    EndTextCommandDisplayText(0.0, 0.0)
    ClearDrawOrigin()
  }
}

const MiscManager = new _Misc()
export default MiscManager
