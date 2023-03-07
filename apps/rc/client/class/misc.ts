import { ResponseCB } from '@nx/types'
import { LG } from '@utils/logger'

class Misc {
  public createPed(
    pedType: 1 | 2,
    model: string,
    cb?: ResponseCB,
  ): number | void {
    if (
      !pedType ||
      !model ||
      // ? pedType === 1 || pedType === 2
      ![1, 2].includes(pedType) ||
      !IsModelAPed(model)
    ) {
      cb?.({
        ok: false,
        message: 'not valid params to create ped.',
      })

      return
    }

    RequestModel(model)
    const i = setInterval(() => {
      if (HasModelLoaded(model)) {
        const playerPed = PlayerPedId()
        const pos = GetEntityCoords(playerPed, true)
        const ped = CreatePed(
          pedType,
          model,
          pos[0],
          pos[1],
          pos[2],
          100,
          true,
          false,
        )
        clearInterval(i)
        SetModelAsNoLongerNeeded(model)
        SetEntityAsNoLongerNeeded(model as unknown as number)
        cb?.({
          ok: true,
          data: ped,
        })
      }
    }, 0)
  }

  public drawText3D(
    coords: number[],
    text: string,
    size: number,
    font: number,
    color: [number, number, number] = [255, 255, 255],
  ): void {
    if (!coords || !text || !size || !font) {
      return LG.error('not valid params to draw 3D text.')
    }
    const camCoords = GetFinalRenderedCamCoord()
    const distance = GetDistanceBetweenCoords(
      coords[0],
      coords[1],
      coords[2],
      camCoords[0],
      camCoords[1],
      camCoords[2],
      true,
    )

    let scale = (size / distance) * 2
    scale = scale * (1 / GetGameplayCamFov()) * 100

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

  public requestAnim(anim: string, cb?: ResponseCB): void {
    if (!anim) {
      cb?.({
        ok: false,
        message: 'not valid params to load animation.',
      })
      return
    }

    const interval = setInterval(() => {
      RequestAnimDict(anim)
      if (HasAnimDictLoaded(anim)) {
        cb?.({
          ok: true,
        })
        clearInterval(interval)
      }
    }, 0)
  }
}

export default new Misc()
