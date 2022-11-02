import { PlayerEventsE } from '../../../types/events'
import { InventoryActionDataT } from '../../../types/main'
import Player from './player.class'

class PlayerService {
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
    }, 30_000)
  }

  public setPlayerLoadedData(nxPlayer: any) {
    Player.setData(nxPlayer)
    Player.setValue('ped', PlayerPedId())
    Player.setValue('uid', nxPlayer.uid)
    Player.loaded = true
  }

  addLocaleItem({ name, amount, type }: InventoryActionDataT): void {
    const nxPlayerInventory = Player.getData().inventory

    nxPlayerInventory[name] = {
      amount,
      type,
    }

    Player.setValue('inventory', nxPlayerInventory)
  }

  removeLocaleItem({ name, amount, type }: InventoryActionDataT): void {
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

  public setLocaleJob({
    job,
    job_grade,
    type,
  }: {
    job: string
    job_grade: string
    type: number
  }) {
    const nxPlayerInfo = Player.getData().charinfo

    if (type === 1) {
      nxPlayerInfo.job = job
      nxPlayerInfo.job_grade = job_grade

      Player.setValue('charinfo', nxPlayerInfo)

      return
    }

    nxPlayerInfo[`job${type}`] = job
    nxPlayerInfo[`job${type}_grade`] = job_grade

    Player.setValue('charinfo', nxPlayerInfo)
  }

  public setLocalePermissions(permission: string) {
    const nxPlayerInfo = Player.getData()

    nxPlayerInfo.permissions = permission

    Player.setValue('permissions', permission)
  }

  public setLocaleAccountMoney({
    account,
    money,
  }: {
    account: string
    money: number
  }) {
    const nxPlayerInfo = Player.getData()

    nxPlayerInfo.accounts[account] = money

    Player.setValue('accounts', nxPlayerInfo.accounts)
  }

  public syncPlayer(): void {
    this.syncCoords()
    this.syncStatus()
  }
}

export default new PlayerService()
