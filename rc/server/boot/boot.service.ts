import { DBEventsE } from '../../../types/events'
import DB from 's@db/db'
import { logger } from 's@utils/logger'

class _BootService {
  private readonly DB: typeof DB
  constructor() {
    this.DB = DB
  }

  private checkDatabaseConnection(): void {
    const start = Date.now()
    this.DB.exec('SELECT now()')
      .then(() => {
        const duration = Date.now() - start
        logger.info(
          `DB connected with succes, execution time: [${duration} ms]`
        )
        emit(DBEventsE.DB_CONNECTED)
      })
      .catch((e) => {
        logger.error(`error while connecting to your DB: ${e}`)
      })
  }

  private async checkResourceVersion(): Promise<void> {
    // TODO: Check resource version.
  }

  public checkResource(): void {
    this.checkDatabaseConnection()
    this.checkResourceVersion()
  }
}

const BootService = new _BootService()
export default BootService
