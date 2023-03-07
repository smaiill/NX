import { DB } from '@db/db'
import { Item, SavedItem } from '@nx/types'

class _ItemsDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }

  public async fetchAll(): Promise<SavedItem[]> {
    return await this.db.exec(this.db.querys.Item.FETCH_ALL)
  }

  public async create(data: Item) {
    return await this.db.exec(this.db.querys.Item.CREATE, [
      data.name,
      data.label,
      data.weight,
      data.type,
      data.props,
      data._unique,
      data.maxInSlot,
      JSON.stringify(data.data),
    ])
  }
}

const ItemsDB = new _ItemsDB()
export { ItemsDB }
