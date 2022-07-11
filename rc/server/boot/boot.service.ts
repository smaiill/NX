import { _DB } from '../db/db'
import { logger } from '../utils/logger'
import fetch from 'node-fetch'

class _BootService {
  constructor() {}

  private checkDatabaseConnection(): void {
    const start = Date.now()
    _DB
      .exec('SELECT now()')
      .then(() => {
        const duration = Date.now() - start
        logger.info(
          `DB connected with succes, execution time: [${duration} ms]`
        )
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
