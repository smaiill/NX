import { DBEventsE } from '../../../types/events'
import DB from '@db/db'
import { logger } from '@utils/logger'

class _BootService {
  private checkDatabaseConnection(): void {
    const start = Date.now()
    DB.exec('SELECT now()')
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

export default new _BootService()
