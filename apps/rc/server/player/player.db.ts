import { DB } from '@db/db'
import { config } from '@shared/load.file'
import { Utils } from '@shared/utils/misc'
import { PlayerUtils } from './player.utils'

class _PlayerDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }

  public async getPlayerFromDB(license: string): Promise<any> {
    try {
      const res = await DB.exec(this.db.querys.Player.SELECT_WITH_IDENTIFIER, [
        license,
      ])

      return res
    } catch (error) {
      throw error
    }
  }

  public async createPlayer(license: string): Promise<any> {
    const bloodType = await PlayerUtils.generateBloodType()
    const uid = await Utils.uuid('SMALL')

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
        nxPlayer.permissions,
        nxPlayer.identifier,
        JSON.stringify(nxPlayer.skin),
      ])

      return res
    } catch (error) {
      throw error
    }
  }
}

export const PlayerDB = new _PlayerDB()
