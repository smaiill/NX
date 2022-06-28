export class _Misc {
  constructor() {}

  Keyboard(state: boolean = false) {
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
}
