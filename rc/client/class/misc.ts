export class _Misc {
  constructor() {}

  keyboard(state: boolean = false): void {
    DisplayOnscreenKeyboard(0, 'FMMC_KEY_TIP8', '', '', '', '', '', 64)

    if (state) {
      HideHudAndRadarThisFrame()
      if (UpdateOnscreenKeyboard() === 3) {
        state = false
      } else if (UpdateOnscreenKeyboard() === 1) {
        const inputText = GetOnscreenKeyboardResult()
        if (inputText.length > 0) {
          DisplayOnscreenKeyboard(0, 'FMMC_KEY_TIP8', '', '', '', '', '', 64)
        } else if (UpdateOnscreenKeyboard() === 2) {
          state = false
        }
      }
    }
  }

  createPed(pedType: number, model: string): void {
    RequestModel(model)
    if (!IsModelAPed(model)) return
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
          GetEntityHeading(playerPed),
          true,
          false
        )

        clearInterval(i)
      }
    }, 500)
  }
}
