class _PlayerUtils {
  private readonly bloodTypes: Record<string, string>
  constructor() {
    this.bloodTypes = {
      'A+': '0-38',
      'A-': '39-73',
      'B+': '74-80',
      'B-': '81-86',
      'AB+': '87-92',
      'AB-': '93-96',
      'O+': '97-99',
      'O-': '100',
    }
  }

  public getPlayerLicense(identifiers: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      identifiers.forEach((identifier) => {
        let [identifierKey, identifierValue] = identifier.split(':')
        if (identifierKey === 'license') {
          return resolve(identifierValue)
        }
      })

      reject('')
    })
  }
  public generateBloodType(): Promise<string> {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.trunc(Math.random() * 100)
      for (const blood in this.bloodTypes) {
        const [bloodMin, bloodMax] = this.bloodTypes[blood].split('-')

        if (randomNumber >= ~~bloodMin && randomNumber <= ~~bloodMax) {
          return resolve(blood)
        }
      }
    })
  }
}

const PlayerUtils = new _PlayerUtils()
export default PlayerUtils
