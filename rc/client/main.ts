import { Wait } from './utils/misc'
;(() => {
  globalThis.exports.spawnmanager.setAutoSpawn(false)
  setTimeout(() => {
    emitNet('naf::newPlayer')
  }, 1000)
})()
