class _PlayerUtils {
  bloodTypes: any
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

  getPlayerLicense(identifiers: string[]): Promise<string> {
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

  // 0 - 38 | 0+
  // 39 - 73 | A+
  // 74 - 80 | B+
  // 81 - 86 | O-
  // 87 - 92 | A-
  // 93 - 96 | AB+
  // 97 - 99 | B-
  // 100 | AB-

  generateBloodType(): Promise<string> {
    return new Promise((resolve, reject) => {
      const randomNumber = Math.floor(Math.random() * 100)
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

// if (randomNumber <= 38) {
//   console.log('0+')
// }
// if (randomNumber >= 39 && randomNumber <= 73) {
//   console.log('A+')
// }
// if (randomNumber >= 74 && randomNumber <= 80) {
//   console.log('B+')
// }
// if (randomNumber >= 81 && randomNumber <= 86) {
//   console.log('O-')
// }
// if (randomNumber >= 87 && randomNumber <= 92) {
//   console.log('A-')
// }
// if (randomNumber >= 93 && randomNumber <= 96) {
//   console.log('AB+')
// }
// if (randomNumber >= 97 && randomNumber <= 99) {
//   console.log('B+')
// }
// if (randomNumber === 100) {
//   console.log('AB-')
// }
