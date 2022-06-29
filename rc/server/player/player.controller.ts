import { PlayerEventsE } from '../../types/events'
import _PlayerService from './player.service'

onNet(PlayerEventsE.NEW_PLAYER, () => {
  const source = globalThis.source
  _PlayerService.newPlayer(getPlayerIdentifiers(source.toString()), source)
})

on('playerDropped', (reason: string) => {
  const source = globalThis.source
  _PlayerService.playerDropped(reason, source)
})

onNet(
  PlayerEventsE.UPDATE_COORDS,
  async (coords: number[], heading: number) => {
    const source = globalThis.source
    const naPlayer = await _PlayerService.getPlayer(source)
    naPlayer.SetCoords(coords[0], coords[1], coords[2], heading)
  }
)
