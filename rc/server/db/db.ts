import { pool } from './pool'

export class _DB {
  constructor() {}

  public static exec(query: string, values?: any[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        return resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }

  public static findAll(table: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`
        const res = await pool?.execute(query)
        if (res) return resolve(res[0])
      } catch (e) {
        reject(e)
      }
    })
  }
}
