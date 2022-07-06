import { logger } from '../utils/logger'
import { pool } from './pool'

export class _DB {
  constructor() {}

  static exec(query: string, values?: any[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        return resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }
}
