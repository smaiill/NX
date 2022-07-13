import { MiscEventsE } from '../../types/events'
import { _DB } from 's@db/db'
import { logger } from 's@utils/logger'

class _BootService {
  private readonly DB: typeof _DB
  constructor() {
    this.DB = _DB
  }

  private checkDatabaseConnection(): void {
    const start = Date.now()
    this.DB.exec('SELECT now()')
      .then(() => {
        const duration = Date.now() - start
        logger.info(
          `DB connected with succes, execution time: [${duration} ms]`
        )
        emit(MiscEventsE.DB_CONNECTED)
      })
      .catch((e) => {
        logger.error(`error while connecting to your DB: ${e}`)
      })
  }

  private async checkResourceVersion(): Promise<void> {
    // TODO: Check resource version.
  }

  checkResource(): void {
    this.checkDatabaseConnection()
    this.checkResourceVersion()
  }
}

const BootService = new _BootService()
export default BootService
