import { PlayerEventsE } from '../../types/events'
import ItemsService from '../items/items.service'
import Player from './player.class'
import PlayerService from './player.service'

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

onNet(PlayerEventsE.PLAYER_LOADED, async (naPlayer: any) => {
  Player.setPlayerData(naPlayer)
  Player.loaded = true
  globalThis.exports.spawnmanager.spawnPlayer(
    {
      x: naPlayer.position.x,
      y: naPlayer.position.y,
      z: naPlayer.position.z,
      heading: naPlayer.position.heading,
      model: GetHashKey('mp_m_freemode_01'),
      skipFade: true,
    },
    () => {
      emit('skinchanger:loadSkin', naPlayer.skin)
      ItemsService.handlePickupsPickup()
      PlayerService.syncPlayer()
    }
  )
})
