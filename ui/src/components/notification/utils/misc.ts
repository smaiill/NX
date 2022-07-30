import { NotificationColorsReplace } from '../../../types/notification'

export const getTextColor = (index: number) => {
  return NotificationColorsReplace[index] ?? NotificationColorsReplace[0]
}

export const parseNotificationContent = (content: string) => {
  const regExp = /\^[0-9]/g
  const matchedArray = content.match(regExp)

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
