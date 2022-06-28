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
    })
  }
}
