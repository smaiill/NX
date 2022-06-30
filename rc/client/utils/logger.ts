class _Logger {
  errorCode: string
  infoCode: string
  warnCode: string
  constructor() {
    this.errorCode = '^9[ERROR]'
    this.infoCode = '^2[INFO]'
    this.warnCode = '^3[WARN]'
  }

  error(message: string) {
    console.log(`${this.errorCode}: ${message}`)
  }

  info(message: string) {
    console.log(`${this.infoCode}: ${message}`)
  }

  warn(message: string) {
    console.log(`${this.warnCode}: ${message}`)
  }
}

const Logger = new _Logger()
export default Logger
