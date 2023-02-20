import { PlayerEvents } from '@nx/types'
import { DeferralsService } from '../services/defferals.service'
import { PlayerService } from './player.service'

onNet(PlayerEvents.NEW_PLAYER, (): void => {
  const source = globalThis.source
  PlayerService.newPlayer(getPlayerIdentifiers(source.toString()), source)
})

on(
  'playerConnecting',
  (playerName: string, reject: Function, deferrals: any): void => {
    const source = globalThis.source
    DeferralsService.validatePlayer({
      source,
      playerName,
      identifiers: getPlayerIdentifiers(source.toString()),
      deferrals,
    })
  }
)

on('playerDropped', (): void => {
  const source = globalThis.source
  PlayerService.playerDropped(source)
})

onNet(
  PlayerEvents.UPDATE_COORDS,
  async (coords: number[], heading: number): Promise<void> => {
    const source = globalThis.source
    const nxPlayer = await PlayerService.getPlayer(source)

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
    const source = globalThis.source
    const nxPlayer = await PlayerService.getPlayer(source)
    if (!nxPlayer) return

    nxPlayer.SetHunger(hunger)
    nxPlayer.SetThirst(thirst)
  }
)
