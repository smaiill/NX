import { ItemsService } from '@items/items.service'
import {
  InventoryActionData,
  InventoryActions,
  InventoryEvents,
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
  globalThis.exports.spawnmanager.spawnPlayer(
    {
      x: nxPlayer.position.x,
      y: nxPlayer.position.y,
      z: nxPlayer.position.z,
      heading: nxPlayer.position.heading,
      model: GetHashKey('mp_m_freemode_01'),
      skipFade: true,
    },
    async () => {
      await PlayerService.setPlayerLoadedData(nxPlayer)
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
  PlayerEvents.UPDATE_LOCALE_CACHE_BY_KEY,
  ({ key, value }: { key: string; value: any }) => {
    PlayerService.setLocalCacheByKey({ key, value })
  }
)
