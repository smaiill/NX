import { DB } from '@db/db'
import { Ban, SavedBan } from '@nx/types'

class _BansDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }

  public async create(data: Ban) {
    return await this.db.exec(this.db.querys.Ban.CREATE, [
      data.license,
      data.bannedBy,
      JSON.stringify(data.identifiers),
      data.reason,
      data.id,
      data.expire,
    ])
  }

  public async delete(id: string) {
    return await this.db.exec(this.db.querys.Ban.DELETE, [id])
  }

  public async fetchAll(): Promise<SavedBan[]> {
    return await this.db.exec(this.db.querys.Ban.FETCH_ALL)
  }
}

const BansDB = new _BansDB()
export { BansDB }
