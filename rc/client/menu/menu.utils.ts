import { Menu } from '../../../types/menu'

class MenuUtils {
  constructor() {}

  public validateMenuCreation(menu: Menu): {
    isValid: boolean
    message: string
  } {
    if (!menu.items || menu.items.length === 0)
      return { isValid: false, message: 'Invalid items !' }

    return { isValid: true, message: 'All good !' }
  }
}

export default new MenuUtils()
