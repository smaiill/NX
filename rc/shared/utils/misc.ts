class _Utils {
  private readonly uuidTypes: any
  private readonly uuidReplace: string
  constructor() {
    this.uuidTypes = {
      SMALL: 8,
      MEDIUM: 18,
      LARGE: 32,
    }
    this.uuidReplace = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  }

  public uuid(type: 'SMALL' | 'MEDIUM' | 'LARGE' = 'LARGE'): string {
    return this.uuidReplace
      .slice(0, this.uuidTypes[type])
      .replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
  }

  public wait(ms: number): Promise<void> {
    return new Promise((res) => {
      setTimeout(res, ms)
    })
  }

  public parseDate(ms: number): string {
    const date = new Date(ms * 1000)
    return date.toLocaleString('fr-FR')
  }
}

const Utils = new _Utils()
export default Utils
