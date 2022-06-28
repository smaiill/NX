export class _PlayerUtils {
  constructor() {}

  static getPlayerLicense(identifiers: string[]): Promise<string> {
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
}
