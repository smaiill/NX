import { ExportMethod, ExportService } from '@decorators/Export'
import { PlayerEvents } from '@nx/types'

@ExportService('Player')
class _PlayerCache {
  public loaded: boolean
  public playerData: Record<string, any>
  constructor() {
    this.loaded = false
    this.playerData = {}
  }

  @ExportMethod()
  public hasLoaded() {
    return this.loaded
  }

  @ExportMethod()
  public setData(data: Record<string, unknown>): void {
    this.playerData = data
  }

  @ExportMethod()
  public getData() {
    return JSON.parse(JSON.stringify(this.playerData))
  }

  public setValue(key: string, value: any): void {
    return (this.playerData[key] = value)
  }

  public getValue(key: string) {
    return this.playerData[key]
  }

  public setStatus(key: 'hunger' | 'thirst', value: number): void {
    if (key !== 'hunger' && key !== 'thirst') return

    if (value > 100) value = 100
    if (value < 0) value = 0

    this.playerData.charinfo[key] = value

    emit(PlayerEvents.ON_STATUS_UPDATED, {
      [key]: this.playerData.charinfo[key],
    })

    emitNet(PlayerEvents.UPDATE_STATUS, {
      hunger: this.playerData.charinfo.hunger,
      thirst: this.playerData.charinfo.thirst,
    })
  }
}

const PlayerCache = new _PlayerCache()
export { PlayerCache }
