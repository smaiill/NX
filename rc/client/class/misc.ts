import logger from '../utils/logger'

export class _Misc {
  constructor() {}

  createPed(pedType: number, model: string, cb?: Function): number | void {
    if (!pedType || !model) {
      return logger.error('not valid params to create ped. [Misc.CreatePed]')
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Misc.CreatePed].')
    }

    RequestModel(model)
    if (!IsModelAPed(model)) return
    const i: NodeJS.Timer = setInterval(() => {
      if (HasModelLoaded(model)) {
        const playerPed: number = PlayerPedId()
        const pos: number[] = GetEntityCoords(playerPed, true)
        const ped: number = CreatePed(
          pedType,
          model,
          pos[0],
          pos[1],
          pos[2],
          GetEntityHeading(playerPed),
          true,
          false
        )
        clearInterval(i)

        cb && cb(ped)
      }
    }, 500)
  }

  drawText3D(
    coords: number[],
    text: string,
    size: number,
    font: number,
    color: [number, number, number] = [255, 255, 255]
  ): void {
    if (!coords || !text || !size || !font) {
      return logger.error('not valid params to draw 3D text. [Misc.DrawText3D]')
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
    SetTextColour(color[0], color[1], color[2], 215)
    BeginTextCommandDisplayText('STRING')
    SetTextCentre(true)
    SetTextOutline()
    AddTextComponentSubstringPlayerName(text)
    SetDrawOrigin(coords[0], coords[1], coords[2], 0)
    EndTextCommandDisplayText(0.0, 0.0)
    ClearDrawOrigin()
  }

  requestAnim(anim: string, cb?: Function): void {
    if (!anim || typeof anim !== 'string') {
      return logger.error(
        'not valid params to load animation. [Misc.RequestAnim]'
      )
    }

    if (cb && typeof cb !== 'function') {
      return logger.error('callback must be a function. [Misc.RequestAnim].')
    }

    const interval = setInterval(() => {
      RequestAnimDict(anim)
      if (HasAnimDictLoaded(anim)) {
        cb && cb()
        clearInterval(interval)
      }
    }, 500)
  }
}

const MiscManager = new _Misc()
export default MiscManager
