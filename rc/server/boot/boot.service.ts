import { _DB } from '../db/db'
import { logger } from '../utils/logger'

class _BootService {
  constructor() {}

  checkDatabaseConnection(): void {
    _DB
      .exec('SELECT now()')
      .then(() => {
        logger.info('DB connected with succes.')
      })
      .catch((e) => {
        logger.error(`error while connecting to your DB: ${e}`)
      })
  }

  checkResource(): void {
    this.checkDatabaseConnection()
    // this.checkResourceVersion()
  }
}

const BootService = new _BootService()
export default BootService
