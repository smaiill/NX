import { DB } from '@modules/db/db'
import { SavedJob } from '@nx/types'

class _JobsDB {
  private db: typeof DB
  constructor() {
    this.db = DB
  }

  public async fetchAll(): Promise<SavedJob[]> {
    return await this.db.exec(this.db.querys.Job.FETCH_ALL)
  }
}

const JobsDB = new _JobsDB()
export { JobsDB }
