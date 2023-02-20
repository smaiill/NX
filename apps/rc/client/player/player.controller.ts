import { ItemsService } from '@items/items.service'
import {
  AccountsEvents,
  InventoryActionData,
  InventoryActions,
  InventoryEvents,
  JobsEvents,
  PermissionsEvents,
  PlayerEvents,
} from '@nx/types'
import { PlayerCache } from './player.class'
import { PlayerService } from './player.service'

const interval = setInterval(() => {
  const ped = PlayerId()
  if (NetworkIsPlayerActive(ped)) {
    globalThis.exports.spawnmanager.setAutoSpawn(false)
    emitNet(PlayerEvents.NEW_PLAYER)
    SetCanAttackFriendly(ped, true, false)
    NetworkSetFriendlyFireOption(true)
    clearInterval(interval)
  }
}, 500)

onNet(
  PlayerEvents.ADD_STATUS,
  ({ status, amount }: { status: string; amount: number }) => {
    if (status !== 'thirst' && status !== 'hunger') return
    const nxPlayerData = PlayerCache.getData()
    PlayerCache.setStatus(
      status,
      parseFloat(nxPlayerData.charinfo[status]) + amount
    )
  }
)

onNet(PlayerEvents.PLAYER_LOADED, async (nxPlayer: any) => {
  await PlayerService.setPlayerLoadedData(nxPlayer)
  globalThis.exports.spawnmanager.spawnPlayer(
    {
      x: nxPlayer.position.x,
      y: nxPlayer.position.y,
      z: nxPlayer.position.z,
      heading: nxPlayer.position.heading,
      model: GetHashKey('mp_m_freemode_01'),
      skipFade: true,
    },
    () => {
      emit('skinchanger:loadSkin', nxPlayer.skin)
      ItemsService.handlePickupsPickup()
      PlayerService.syncPlayer()

      emit(PlayerEvents.ON_PLAYER_LOADED, nxPlayer)
    }
  )
})

onNet(
  InventoryEvents.UPDATE_INVENTORY,
  ({
    item,
    type,
  }: {
    type: keyof typeof InventoryActions
    item: InventoryActionData
  }) => {
    emit(InventoryEvents.ON_INVENTORY_UPDATED, {
      type,
      item,
    })

    switch (type) {
      case InventoryActions.ADD:
        PlayerService.addLocaleItem({
          name: item.name,
          amount: item.amount,
          type: item.type,
        })
        break

      case InventoryActions.REMOVE:
        PlayerService.removeLocaleItem({
          name: item.name,
          amount: item.amount,
          type: item.type,
        })

        break
    }
  }
)

onNet(
  JobsEvents.ON_JOB_UPDATED,
  ({
    job,
    job_grade,
    type,
  }: {
    job: string
    job_grade: string
    type: number
  }) => {
    PlayerService.setLocaleJob({ job, job_grade, type })
  }
)

onNet(PermissionsEvents.ON_PERMISSIONS_UPDATED, (permission: string) => {
  PlayerService.setLocalePermissions(permission)
})

onNet(
  AccountsEvents.ON_ACCOUNT_UPDATED,
  ({ account, money }: { account: string; money: number }) => {
    PlayerService.setLocaleAccountMoney({ account, money })
  }
)
