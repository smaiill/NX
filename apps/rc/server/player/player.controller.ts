import { PlayerEvents } from '@nx/types'
import { getSrc } from '@utils/src'
import { DeferralsService } from '../services/defferals.service'
import { PlayerService } from './player.service'

onNet(PlayerEvents.NEW_PLAYER, (): void => {
  const src = getSrc()
  PlayerService.newPlayer(getPlayerIdentifiers(src.toString()), src)
})

on(
  'playerConnecting',
  (playerName: string, reject: Function, deferrals: any): void => {
    const src = getSrc()
    DeferralsService.validatePlayer({
      source,
      playerName,
      identifiers: getPlayerIdentifiers(src.toString()),
      deferrals,
    })
  }
)

on('playerDropped', (): void => {
  const src = getSrc()
  PlayerService.playerDropped(src)
})

onNet(
  PlayerEvents.UPDATE_COORDS,
  async (coords: number[], heading: number): Promise<void> => {
    const src = getSrc()
    const nxPlayer = await PlayerService.getPlayer(src)

    if (!nxPlayer) return

    nxPlayer.SetCoords(coords[0], coords[1], coords[2], heading)
  }
)

onNet(
  PlayerEvents.UPDATE_STATUS,
  async ({
    thirst,
    hunger,
  }: {
    thirst: number
    hunger: number
  }): Promise<void> => {
    const src = getSrc()
    const nxPlayer = await PlayerService.getPlayer(src)

    if (!nxPlayer) return

    nxPlayer.SetHunger(hunger)
    nxPlayer.SetThirst(thirst)
  }
)
