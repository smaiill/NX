import { Querys } from '@db/consts'
import { DB } from '@db/db'
import { config } from '@shared/load.file'
import { Utils } from '@shared/utils/misc'
import { PlayerUtils } from './player.utils'

export class PlayerDB {
  constructor() {}

  public static async getPlayerFromDB(license: string): Promise<any> {
    try {
      const res = await DB.exec(Querys.Player.SELECT_WITH_IDENTIFIER, [license])

      return res
    } catch (error) {
      throw error
    }
  }

  public static async createPlayer(license: string): Promise<any> {
    const bloodType = await PlayerUtils.generateBloodType()
    const uid = await Utils.uuid('SMALL')

    try {
      const res = await DB.exec(Querys.Player.CREATE, [
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

  public static async savePlayer(nxPlayer: any): Promise<any> {
    if (!nxPlayer) {
      throw 'no player specified'
    }

    try {
      const res = await DB.exec(Querys.Player.UPDATE, [
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
