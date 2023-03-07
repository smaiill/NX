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

  public getPlayerIdentifier(
    identifiers: string[],
    identifierToFind: string,
  ): string | false {
    for (const ID of identifiers) {
      const [IDName, IDValue] = ID.split(':')

      if (IDName === identifierToFind) {
        return IDValue
      }
    }

    return false
  }

  public generateBloodType(): string {
    const randomNumber = Math.trunc(Math.random() * 100)
    for (const blood in this.bloodTypes) {
      const [bloodMin, bloodMax] = this.bloodTypes[blood].split('-')

      if (randomNumber >= ~~bloodMin && randomNumber <= ~~bloodMax) {
        return blood
      }
    }

    return 'A+'
  }
}

const PlayerUtils = new _PlayerUtils()
export { PlayerUtils }
