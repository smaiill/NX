import { _DB } from '../db/db'
import PlayerUtils from './player.utils'
export class _PlayerDB {
  constructor() {}

  static getPlayerFromDB(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const [res] = await _DB.exec(
        'SELECT * FROM naf_users WHERE identifier = ? ',
        [license]
      )
      if (!res) return reject()

      resolve(res)
    })
  }

  static createPlayer(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const bloodType = await PlayerUtils.generateBloodType()
      const res = await _DB.exec(
        'INSERT INTO naf_users (identifier, charinfo) VALUES (?, ?)',
        [
          license,
          JSON.stringify({
            firstname: '',
            lastname: '',
            dob: '',
            nationality: '',
            height: 0,
            sex: '',
            job: 'unemployed',
            job_grade: 0,
            job2: 'unemployed2',
            job2_grade: 0,
            hunger: 100,
            thirst: 100,
            blood_type: bloodType,
          }),
        ]
      )

      if (!res) return reject()

      resolve(res)
    })
  }

  static savePlayer(naPlayer: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!naPlayer) return reject('')
      const res = await _DB.exec(
        'UPDATE naf_users SET charinfo = ?, inventory = ?, accounts = ?, position = ?, permissions = ? WHERE identifier = ?',
        [
          JSON.stringify(naPlayer.charinfo),
          JSON.stringify(naPlayer.inventory),
          JSON.stringify(naPlayer.accounts),
          JSON.stringify(naPlayer.position),
          naPlayer.permissions,
          naPlayer.identifier,
        ]
      )

      if (!res) return reject()

      resolve(res)
    })
  }
}
