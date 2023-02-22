import { InventoryActionData, PlayerEvents } from '@nx/types'
import { PlayerCache } from './player.class'

class _PlayerService {
  constructor() {}

  private syncCoords(): void {
    setInterval(() => {
      const ped = PlayerCache.getValue('ped')
      const coords = GetEntityCoords(ped, false)
      const heading = GetEntityHeading(ped)
      emitNet(PlayerEvents.UPDATE_COORDS, coords, heading)
    }, 3_000)
  }

  private syncStatus(): void {
    setInterval(() => {
      const nxPlayerData = PlayerCache.getData()
      PlayerCache.setStatus(
        'thirst',
        parseFloat(nxPlayerData.charinfo.thirst) - 0.4
      )
      PlayerCache.setStatus(
        'hunger',
        parseFloat(nxPlayerData.charinfo.hunger) - 0.4
      )
    }, 30_000)
  }

  public setPlayerLoadedData(nxPlayer: any) {
    PlayerCache.setData(nxPlayer)
    PlayerCache.setValue('ped', PlayerPedId())
    PlayerCache.setValue('uid', nxPlayer.uid)
    PlayerCache.loaded = true
  }

  addLocaleItem({ name, amount, type }: InventoryActionData): void {
    const nxPlayerInventory = PlayerCache.getData().inventory

    nxPlayerInventory[name] = {
      amount,
      type,
    }

    PlayerCache.setValue('inventory', nxPlayerInventory)
  }

  removeLocaleItem({ name, amount, type }: InventoryActionData): void {
    const nxPlayerInventory = PlayerCache.getData().inventory

    if (amount === 0) {
      delete nxPlayerInventory[name]
      PlayerCache.setValue('inventory', nxPlayerInventory)
      return
    }

    nxPlayerInventory[name] = {
      type,
      amount,
    }

    PlayerCache.setValue('inventory', nxPlayerInventory)
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
    const nxPlayerInfo = PlayerCache.getData().charinfo

    if (type === 1) {
      nxPlayerInfo.job = job
      nxPlayerInfo.job_grade = job_grade

      PlayerCache.setValue('charinfo', nxPlayerInfo)

      return
    }

    nxPlayerInfo[`job${type}`] = job
    nxPlayerInfo[`job${type}_grade`] = job_grade

    PlayerCache.setValue('charinfo', nxPlayerInfo)
  }

  public setLocalePermissions(permission: string) {
    const nxPlayerInfo = PlayerCache.getData()

    nxPlayerInfo.permissions = permission

    PlayerCache.setValue('permissions', permission)
  }

  public setLocaleAccountMoney({
    account,
    money,
  }: {
    account: string
    money: number
  }) {
    const nxPlayerInfo = PlayerCache.getData()

    nxPlayerInfo.accounts[account] = money

    PlayerCache.setValue('accounts', nxPlayerInfo.accounts)
  }

  public setLocaleCharInfo(k: string, v: any) {
    const nxPlayerInfo = PlayerCache.getData()

    nxPlayerInfo.charinfo[k] = v

    PlayerCache.setValue('charinfo', nxPlayerInfo.charinfo)
  }

  public syncPlayer(): void {
    this.syncCoords()
    this.syncStatus()
  }
}

const PlayerService = new _PlayerService()
export { PlayerService }
