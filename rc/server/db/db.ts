import { pool } from './pool'

export class _DB {
  constructor() {}

  static exec(query: string, values?: any[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        return resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

// 644270566e360a57fd3810d581e6e46773250193
