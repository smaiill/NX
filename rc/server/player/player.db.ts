import { DBQueries } from '../../types/db'
import PlayerUtils from './player.utils'
import Utils from '@shared/utils/misc'
import DB from 's@db/db'

export class _PlayerDB {
  constructor() {}

  public static getPlayerFromDB(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const [res] = await DB.exec(DBQueries.SELECT_PLAYER_W_IDENTIFIER, [
        license,
      ])
      if (!res) return reject()

      resolve(res)
    })
  }

  public static createPlayer(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const bloodType = await PlayerUtils.generateBloodType()
      const uid = await Utils.uuid()
      const res = await DB.exec(DBQueries.CRAETE_PLAYER, [
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
          job2: 'unemployed2',
          job2_grade: 'unemployed',
          hunger: 100,
          thirst: 100,
          blood_type: bloodType,
        }),
        uid,
      ])

      if (!res) return reject()

      resolve(res)
    })
  }

  public static savePlayer(nxPlayer: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!nxPlayer) return reject('')
      const res = await DB.exec(DBQueries.UPDATE_PLAYER, [
        JSON.stringify(nxPlayer.charinfo),
        JSON.stringify(nxPlayer.inventory),
        JSON.stringify(nxPlayer.accounts),
        JSON.stringify(nxPlayer.position),
        nxPlayer.permissions,
        nxPlayer.identifier,
      ])

      if (!res) return reject()

      resolve(res)
    })
  }
}
