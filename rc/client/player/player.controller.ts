import { InventoryEeventsE, PlayerEventsE } from '../../types/events'
import { InventoryActions, InventoryActionsT } from '../../types/main'
import Player from './player.class'
import PlayerService from './player.service'
import ItemsService from 'c@items/items.service'

const interval = setInterval(() => {
  const ped = PlayerId()
  if (NetworkIsPlayerActive(ped)) {
    globalThis.exports.spawnmanager.setAutoSpawn(false)
    emitNet(PlayerEventsE.NEW_PLAYER)
    SetCanAttackFriendly(ped, true, false)
    NetworkSetFriendlyFireOption(true)
    clearInterval(interval)
  }
}, 500)

onNet(
  PlayerEventsE.ADD_STATUS,
  ({ status, amount }: { status: string; amount: number }) => {
    if (status !== 'thirst' && status !== 'hunger') return
    const nxPlayerData = Player.getData()
    Player.setStatus(status, parseFloat(nxPlayerData.charinfo[status]) + amount)
  }
)

onNet(PlayerEventsE.PLAYER_LOADED, async (nxPlayer: any) => {
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
    }
  )
})

onNet(
  InventoryEeventsE.UPDATE_INVENTORY,
  ({
    item,
    type,
  }: {
    type: InventoryActionsT
    item: { name: string; amount: number; type: string }
  }) => {
    emit(InventoryEeventsE.ON_INVENTORY_UPDATED, {
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
