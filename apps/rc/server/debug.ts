import { PlayerService } from '@player/player.service'

const DEBUG = false

if (DEBUG) {
  async function run() {
    await PlayerService.newPlayer(
      ['license:a8ba95eb67cf3857bda530724b653569e42f8160'],
      1
    )

    const nxPlayer = await PlayerService.getPlayersData()

    console.log(nxPlayer)
  }

  run()
}
