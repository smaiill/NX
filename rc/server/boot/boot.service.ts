import { _DB } from '../db/db'
import { logger } from '../utils/logger'

class _BootService {
  constructor() {}

  checkDatabaseConnection() {
    _DB
      .exec('SELECT now()')
      .then(() => {
        logger.info('DB connected with succes.')
      })
      .catch((e) => {
        logger.error(`error while connecting to your DB: ${e}`)
      })
  }

  checkResource() {
    this.checkDatabaseConnection()
    // this.checkIsServerOpen()
  }
}

const BootService = new _BootService()
export default BootService
