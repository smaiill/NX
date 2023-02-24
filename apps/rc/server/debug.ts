import { PlayerService } from '@player/player.service'

const DEBUG = true

if (DEBUG) {
  async function run() {
    await PlayerService.newPlayer(
      ['license:a8ba95eb67cf3857bda530724b653569e42f8160'],
      1
    )

    setTimeout(async () => {
      const nxPlayer = await PlayerService.getPlayer(1)

      console.log('---------------------------------------')
      // console.log(nxPlayer)

      // nxPlayer.Save()
    }, 2000)
  }

  run()
}
