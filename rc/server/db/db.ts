import { RespCB } from '../../../types/main'
import { pool } from './pool'

export class _DB {
  constructor() {}

  public exec(query: string, values: any[] = [], cb?: RespCB): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await pool?.execute(query, values)
        cb?.({ status: 'succes', data: res })
        resolve(res)
        return
      } catch (e) {
        cb?.({ status: 'error', message: e })
        reject(e)
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
          cb?.({ status: 'succes', data: res[0] })
          return
        }
      } catch (e) {
        reject(e)
        cb?.({ status: 'error', message: e })
      }
    })
  }
}

export default new _DB()
