class _Utils {
  private readonly RANDOM_NUMBER_TIMES: number
  constructor() {
    this.RANDOM_NUMBER_TIMES = 100_000_000_000
  }

  public uuid(base16: boolean = true): string | number {
    const randomNumber = Math.floor(Math.random() * this.RANDOM_NUMBER_TIMES)

    if (base16) {
      return randomNumber.toString(16)
    }

    return randomNumber
  }

  public wait(ms: number): Promise<void> {
    return new Promise((res) => {
      setTimeout(res, ms)
    })
  }

  public parseDate(ms: number) {
    const date = new Date(ms * 1000)
    return date.toLocaleString('fr-FR')
  }
}

const Utils = new _Utils()
export default Utils
