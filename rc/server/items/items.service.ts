import { ItemI, NAFItems } from '../../config/naf.items.config'

export class _ItemsService {
  Items: ItemI[]
  constructor() {
    this.Items = NAFItems
  }

  // registerUsableItem(itemName: string, callback: Function): any {
  //     if(!callback) {
  //         return console.log('No callback !')
  //     }

  // }

  isItem(itemName: string): any {
    return this.Items.find((item) => item.name === itemName)
  }

  getItemWeight(itemName: string): number {
    const item = this.Items.find((item) => item.name === itemName)

    if (!item) {
      return 0
    }

    return item.weight
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
