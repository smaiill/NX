import { NotificationColorsReplace } from '@nx/types'

const getTextColor = (index: number) => {
  return NotificationColorsReplace[index] ?? NotificationColorsReplace[0]
}

const parseNotificationContent = (content: string): string => {
  const REG = /\^[0-9]/g
  const matchedArray = content.match(REG)

  if (!matchedArray) return content

  for (const matchedKey of matchedArray) {
    const matchedNumber = ~~matchedKey.split('')[1]
    const color = getTextColor(matchedNumber).toLowerCase()

    if (color === 'close') {
      content = content.replace(`^${matchedNumber}`, '</span>')
    }

    content = content.replace(
      `^${matchedNumber}`,
      `<span class='special-color-${matchedNumber}'>`
    )
  }
  return content
}

export { getTextColor, parseNotificationContent }
