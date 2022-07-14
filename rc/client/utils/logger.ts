class _Logger {
  private errorCode: string
  private infoCode: string
  private warnCode: string
  constructor() {
    this.errorCode = '^9[ERROR]'
    this.infoCode = '^2[INFO]'
    this.warnCode = '^3[WARN]'
  }

  public error(message: string) {
    console.log(`${this.errorCode}: ${message}`)
  }

  public info(message: string) {
    console.log(`${this.infoCode}: ${message}`)
  }

  public warn(message: string) {
    console.log(`${this.warnCode}: ${message}`)
  }
}

const Logger = new _Logger()
export default Logger
