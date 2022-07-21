import { ClientColors } from '../../types/misc'

class _Logger {
  private logsCodes: {
    error: string
    info: string
    warn: string
    debug: string
  }
  constructor() {
    this.logsCodes = {
      error: `${ClientColors.RED}[ERROR]`,
      info: `${ClientColors.GREEN}[INFO]`,
      warn: `${ClientColors.ORANGE}[WARN]`,
      debug: `${ClientColors.WHITE}[DEBUG]`,
    }
  }

  public error(message: string): void {
    console.log(`${this.logsCodes.error}: ${message}`)
  }

  public info(message: string): void {
    console.log(`${this.logsCodes.info}: ${message}`)
  }

  public warn(message: string): void {
    console.log(`${this.logsCodes.warn}: ${message}`)
  }

  public debug(message: string = 'debug message.'): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${this.logsCodes.debug}: ${message}`)
    }
  }
}

const logger = new _Logger()
export default logger
