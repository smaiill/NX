import { RespCB } from '../../../types/main'
import { pool } from './pool'

export class _DB {
  constructor() {}

  public exec(query: string, values: any[] = [], cb?: RespCB): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        resolve(res)
        cb && cb({ status: 'succes', data: res })
        return
      } catch (e) {
        reject(e)
        cb && cb({ status: 'succes', message: e })
      }
    })
  }

  public findAll(table: string, cb?: RespCB): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`
        const res = await pool?.execute(query)
        if (res) {
          resolve(res[0])
          cb && cb({ status: 'succes', data: res[0] })
          return
        }
      } catch (e) {
        reject(e)
        cb && cb({ status: 'error', message: e })
      }
    })
  }
}

const DB = new _DB()
export default DB
