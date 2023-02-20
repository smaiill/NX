import { Menu } from '@nx/types'

class _MenuUtils {
  constructor() {}

  public validateMenuCreation(menu: Menu): {
    isValid: boolean
    message: string
  } {
    if (!menu.items || menu.items.length === 0)
      return { isValid: false, message: 'Invalid items !' }

    let itemIDS: string[] = []

    for (const item of menu.items) {
      if (item.onClick && typeof item.onClick !== 'function') {
        return { isValid: false, message: 'Invalid on click handler !' }
      }

      item.selected = false
      itemIDS.push(item.id)
    }

    const nonDuplicateArray = [...new Set(itemIDS)]

    if (itemIDS.length !== nonDuplicateArray.length) {
      return { isValid: false, message: 'Duplicated ID !' }
    }

    return { isValid: true, message: 'All good !' }
  }
}

const MenuUtils = new _MenuUtils()
export { MenuUtils }
