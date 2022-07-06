class _Utils {
  RANDOM_NUMBER_TIMES: number
  constructor() {
    this.RANDOM_NUMBER_TIMES = 100_000_000_000
  }

  uuid(
    length: number = this.RANDOM_NUMBER_TIMES,
    base16: boolean = true
  ): string | number {
    const randomNumber = Math.floor(Math.random() * this.RANDOM_NUMBER_TIMES)

    if (base16) {
      return randomNumber.toString(16)
    }

    return randomNumber
  }

  wait(ms: number): Promise<void> {
    return new Promise((res) => {
      setTimeout(res, ms)
    })
  }
}

const Utils = new _Utils()
export default Utils
