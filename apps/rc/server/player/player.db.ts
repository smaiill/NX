import { DB } from '@db/db'
import { NXPlayer } from '@nx/types'
import { config } from '@shared/load.file'
import { uuid } from '@shared/utils/random'
import { LG } from '@utils/logger'
import { PlayerUtils } from './player.utils'

class _PlayerDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }

  public async getPlayerFromDB(license: string): Promise<any> {
    try {
      const [res] = await DB.exec<any>(
        this.db.querys.Player.SELECT_WITH_IDENTIFIER,
        [license],
      )

      res.inventory = JSON.parse(res.inventory as unknown as string)
      res.accounts = JSON.parse(res.accounts as unknown as string)
      res.position = JSON.parse(res.position as unknown as string)
      res.skin = JSON.parse(res.skin as unknown as string)
      res.charinfo = JSON.parse(res.charinfo as unknown as string)

      return res as NXPlayer
    } catch (error) {
      LG.silly('Player not found in DB')
      throw error
    }
  }

  public async createPlayer(license: string) {
    const bloodType = PlayerUtils.generateBloodType()
    const uid = uuid()

    try {
      const res = await DB.exec(this.db.querys.Player.CREATE, [
        license,
        JSON.stringify({
          firstname: '',
          lastname: '',
          dob: '',
          nationality: '',
          height: 0,
          sex: '',
          job: 'unemployed',
          job_grade: 'unemployed',
          hunger: 100,
          thirst: 100,
          blood_type: bloodType,
        }),
        uid,
        JSON.stringify(config.accounts),
      ])

      return res
    } catch (error) {
      LG.silly("Couldn't create the player")
      throw error
    }
  }

  public async savePlayer(nxPlayer: any): Promise<any> {
    if (!nxPlayer) {
      throw 'no player specified'
    }

    try {
      const res = await DB.exec(this.db.querys.Player.UPDATE, [
        JSON.stringify(nxPlayer.charinfo),
        JSON.stringify(nxPlayer.inventory),
        JSON.stringify(nxPlayer.accounts),
        JSON.stringify(nxPlayer.position),
        nxPlayer.group,
        nxPlayer.identifier,
        JSON.stringify(nxPlayer.skin),
      ])

      return res
    } catch (error) {
      LG.silly("Couldn't save the player")
      throw error
    }
  }
}

export const PlayerDB = new _PlayerDB()
