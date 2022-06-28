import _PlayerService from './player.service'

onNet('naf::newPlayer', () => {
  const source = globalThis.source
  _PlayerService.newPlayer(getPlayerIdentifiers(source.toString()), source)
})

on('playerDropped', (reason: string) => {
  const source = globalThis.source
  _PlayerService.playerDropped(reason, source)
})
