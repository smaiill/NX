import { On, OnlyClient, OnNet } from '@decorators/Event'
import { Defferals, PlayerEvents } from '@nx/types'
import { getSrc } from '@utils/src'
import { DeferralsService } from '../services/defferals.service'
import { PlayerService } from './player.service'

export class PlayerController {
  @OnlyClient()
  @OnNet(PlayerEvents.NEW_PLAYER)
  public handleNewPlayer() {
    const src = getSrc()
    PlayerService.newPlayer(getPlayerIdentifiers(src.toString()), src)
  }

  @On('playerConnecting')
  public handlePlayerConnected(
    playerName: string,
    _: unknown,
    deferrals: Defferals,
  ) {
    const src = getSrc()
    DeferralsService.validatePlayer({
      source,
      playerName,
      identifiers: getPlayerIdentifiers(src.toString()),
      deferrals,
    })
  }

  @On('playerDropped')
  public handlePlayerDropped() {
    const src = getSrc()
    PlayerService.playerDropped(src)
  }

  @OnNet(PlayerEvents.UPDATE_STATUS)
  public async handleUpdateStatus({
    thirst,
    hunger,
  }: {
    thirst: number
    hunger: number
  }) {
    const src = getSrc()
    const nxPlayer = await PlayerService.getPlayer(src)

    if (!nxPlayer) return

    nxPlayer.SetHunger(hunger)
    nxPlayer.SetThirst(thirst)
  }
}
