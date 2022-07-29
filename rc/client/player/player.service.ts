import { PlayerEventsE } from '../../types/events'
import Player from './player.class'

class _PlayerService {
  constructor() {}

  private syncCoords(): void {
    setInterval(() => {
      const ped = Player.getValue('ped')
      const coords = GetEntityCoords(ped, false)
      const heading = GetEntityHeading(ped)
      emitNet(PlayerEventsE.UPDATE_COORDS, coords, heading)
    }, 3_000)
  }

  private syncStatus(): void {
    setInterval(() => {
      const nxPlayerData = Player.getData()
      Player.setStatus('thirst', parseFloat(nxPlayerData.charinfo.thirst) - 0.4)
      Player.setStatus('hunger', parseFloat(nxPlayerData.charinfo.hunger) - 0.4)
    }, 250)
  }

  public setPlayerLoadedData(nxPlayer: any) {
    Player.setData(nxPlayer)
    Player.setValue('ped', PlayerPedId())
    Player.loaded = true
  }

  addLocaleItem({
    name,
    amount,
    type,
  }: {
    name: string
    amount: number
    type: string
  }): void {
    const nxPlayerInventory = Player.getData().inventory

    nxPlayerInventory[name] = {
      amount,
      type,
    }

    Player.setValue('inventory', nxPlayerInventory)
  }

  removeLocaleItem({
    name,
    amount,
    type,
  }: {
    name: string
    amount: number
    type: string
  }): void {
    const nxPlayerInventory = Player.getData().inventory

    if (amount === 0) {
      delete nxPlayerInventory[name]
      Player.setValue('inventory', nxPlayerInventory)
      return
    }

    nxPlayerInventory[name] = {
      type,
      amount,
    }

    Player.setValue('inventory', nxPlayerInventory)
  }

  public syncPlayer(): void {
    this.syncCoords()
    this.syncStatus()
  }
}

const PlayerService = new _PlayerService()
export default PlayerService
