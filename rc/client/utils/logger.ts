export default class logger {
  constructor() {}

  static error(message: string) {
    console.log(`^1[ERROR]: ${message}`)
  }

  static info(message: string) {
    console.log(`^2[INFO]: ${message}`)
  }

  static warn(message: string) {
    console.log(`^3[WARN]: ${message}`)
  }
}
