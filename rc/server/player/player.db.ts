import { _DB } from '../db/db'

export class _PlayerDB {
  constructor() {}

  static getPlayerFromDB(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const [res] = await _DB.exec(
        'SELECT * FROM naf_users WHERE identifier = ? ',
        [license]
      )
      if (res) {
        return resolve(res)
      }

      reject('ERROR')
    })
  }

  static createPlayer(license: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await _DB.exec(
        'INSERT INTO naf_users (identifier) VALUES (?)',
        [license]
      )

      if (!res) return reject('')

      resolve(res)
    })
  }

  static savePlayer(naPlayer: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
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

      if (!res) return reject('')

      resolve(res)
    })
  }
}
