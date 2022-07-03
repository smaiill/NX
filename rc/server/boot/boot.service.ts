import { logger } from '../utils/logger'

class _BootService {
  constructor() {}

  logResourceStarted() {
    logger.info('resource started.')
  }

  checkResource() {
    this.logResourceStarted()
  }
}

const BootService = new _BootService()
export default BootService
