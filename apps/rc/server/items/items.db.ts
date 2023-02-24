import { DB } from '@db/db'

class _ItemsDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }
}

const ItemsDB = new _ItemsDB()
export { ItemsDB }
