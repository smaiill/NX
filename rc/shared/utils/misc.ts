class _Utils {
  RANDOM_NUMBER_TIMES: number
  constructor() {
    this.RANDOM_NUMBER_TIMES = 100_000_000_000
  }

  uuid(): string {
    return Math.floor(Math.random() * this.RANDOM_NUMBER_TIMES).toString(16)
  }

  wait(ms: number): Promise<void> {
    return new Promise((res) => {
      setTimeout(res, ms)
    })
  }
}

const Utils = new _Utils()
export default Utils
