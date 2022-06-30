import ObjectManager from '../class/object'

class _ItemsService {
  Pickups: any[]
  constructor() {
    this.Pickups = []
  }
}

const ItemsService = new _ItemsService()
export default ItemsService
