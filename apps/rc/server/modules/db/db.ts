import { ResponseCB } from '@nx/types'
import { pool } from './pool'
import { Querys } from './querys'

class _DB {
  querys: typeof Querys
  constructor() {
    this.querys = Querys
  }

  public async exec<T = unknown>(
    query: string,
    values: unknown[] = [],
    cb?: ResponseCB,
  ) {
    try {
      const res = await pool?.execute(query, values)

      if (!res) {
        throw 'no res'
      }

      cb?.({ ok: true, data: res[0] })
      return res[0] as T
    } catch (e) {
      cb?.({ ok: false, message: e as string })
      throw e
    }
  }
}

const DB = new _DB()
export { DB }
