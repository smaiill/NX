import { Wait } from '../utils/misc'

const ACTIVE_PAUSE_MENU: boolean = false
const TO_WAIT = ACTIVE_PAUSE_MENU ? 0 : 60000

const pauseMenuConfig = {
  fivem: 'FiveM - NAFCore',
  map: 'Los Santos',
  game: 'Game menu',
  disconnect: 'Disconnect',
  close: 'Close Fivem !',
  info: 'Logs',
  statistics: 'Statistics',
  settings: 'Your Settings',
  gallery: 'Gallery',
  editor: 'Your Settings',
  FiveM_Keys: 'Gallery',
}

setTick(async () => {
  if (ACTIVE_PAUSE_MENU) {
    AddTextEntry('FE_THDR_GTAO', pauseMenuConfig.fivem)
    AddTextEntry('PM_SCR_MAP', pauseMenuConfig.map)
    AddTextEntry('PM_SCR_GAM', pauseMenuConfig.game)
    AddTextEntry('PM_PANE_LEAVE', pauseMenuConfig.disconnect)
    AddTextEntry('PM_PANE_QUIT', pauseMenuConfig.close)
    AddTextEntry('PM_SCR_INF', pauseMenuConfig.info)
    AddTextEntry('PM_SCR_STA', pauseMenuConfig.statistics)
    AddTextEntry('PM_SCR_SET', pauseMenuConfig.settings)
    AddTextEntry('PM_SCR_GAL', pauseMenuConfig.gallery)
    AddTextEntry('PM_SCR_RPL', pauseMenuConfig.editor)
    AddTextEntry('PM_SCR_CFX', pauseMenuConfig.FiveM_Keys)
  }

  await Wait(TO_WAIT)
})
