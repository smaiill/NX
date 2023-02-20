import { ResponseCB } from '@nx/types'
import { pool } from './pool'

class _DB {
  constructor() {}

  public async exec(
    query: string,
    values: any[] = [],
    cb?: ResponseCB
  ): Promise<any> {
    try {
      const res = await pool?.execute(query, values)

      if (!res) {
        throw 'no res'
      }

      cb?.({ ok: true, data: res[0] })
      return res[0]
    } catch (e) {
      cb?.({ ok: false, message: e })
      throw e
    }
  }

  public async findAll(table: string, cb?: ResponseCB): Promise<any> {
    try {
      const query = `SELECT * FROM ${table}`
      const res = await pool?.execute(query)
      if (res) {
        cb?.({ ok: true, data: res[0] })
        return res[0]
      }
    } catch (e) {
      cb?.({ ok: false, message: e })
      throw e
    }
  }
}

const DB = new _DB()
export { DB }
