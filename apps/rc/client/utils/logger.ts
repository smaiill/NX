import { CodeColors } from '@nx/types'

class _Logger {
  private readonly logsCodes: {
    error: string
    info: string
    warn: string
    debug: string
  }
  constructor() {
    this.logsCodes = {
      error: `${CodeColors.RED}[ERROR]`,
      info: `${CodeColors.GREEN}[INFO]`,
      warn: `${CodeColors.ORANGE}[WARN]`,
      debug: `${CodeColors.WHITE}[DEBUG]`,
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

const LG = new _Logger()
export { LG }
