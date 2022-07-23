export const isEnvBrowser = (): boolean => !(window as any).invokeNative

export const uuid = (length: number = 16) => {
  let generatedID = ''
  for (let i = 0; i < length; i++) {
    let charachter = (Math.random() + 1).toString(36).substring(11)
    generatedID += charachter
    switch (i) {
      case 4:
        generatedID += '-'
        break
      case 8:
        generatedID += '-'
        break
      case 12:
        generatedID += '-'
        break
      default:
        break
    }
  }
  return generatedID
}
