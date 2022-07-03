import ItemsService from '../items/items.service'

class _Player {
  identifier: string
  charinfo: any
  inventory: any
  accounts: any
  position: any
  permissions: string
  weight: number
  name: string
  source: number

  constructor(
    identifier: string,
    charinfo: any,
    inventory: any,
    accounts: any,
    position: any,
    permissions: string,
    weight: number,
    name: string,
    source: number
  ) {
    this.identifier = identifier
    this.charinfo = charinfo
    this.inventory = inventory
    this.accounts = accounts
    this.position = position
    this.permissions = permissions
    this.weight = weight
    this.name = name
    this.source = source
  }

  getWeight(): number {
    return this.weight
  }

  getName(): string {
    return this.name
  }

  getCharInfo(): any {
    return this.charinfo
  }

  getIdentifier(): string {
    return this.identifier
  }

  getCoords(): any {
    return this.position
  }

  getInventory() {
    return this.inventory
  }

  getAccounts(): any {
    return this.accounts
  }

  getPermissions(): any {
    return this.permissions
  }

  getAccountMoney(account: string) {
    if (!account || account !== 'bank') {
      return
    }

    return this.accounts[account]
  }

  setCoords(x: number, y: number, z: number, heading: number): void {
    if (!x || !y || !z || !heading) {
      return
    }

    const NUMBER_AFTER_DOT: number = 3

    const minCoords = {
      x: x.toString().split('.'),
      y: y.toString().split('.'),
      z: z.toString().split('.'),
      heading: heading.toString().split('.'),
    }

    const newCoords = {
      x: `${minCoords.x[0]}.${minCoords.x[1].slice(0, NUMBER_AFTER_DOT)}`,
      y: `${minCoords.y[0]}.${minCoords.y[1].slice(0, NUMBER_AFTER_DOT)}`,
      z: `${minCoords.z[0]}.${minCoords.z[1].slice(0, NUMBER_AFTER_DOT)}`,
      heading: `${minCoords.heading[0]}.${minCoords.heading[1].slice(
        0,
        NUMBER_AFTER_DOT
      )}`,
    }

    this.position = {
      x: parseFloat(newCoords.x),
      y: parseFloat(newCoords.y),
      z: parseFloat(newCoords.z),
      heading: parseFloat(newCoords.x),
    }

    return
  }

  emitEvent(eventName: string, ...args: any[]) {
    emitNet(eventName, this.source, ...args)
  }

  hasItem(itemName: string): boolean | any {
    const item = this.inventory[itemName]
    if (item) {
      return item
    }

    return false
  }

  getInventoryItem(itemName: string): any {
    const item = this.inventory[itemName]

    if (item) {
      return item
    }

    return false
  }

  async removeInventoryItem(name: string, amount: number, cb?: Function) {
    const item = await this.hasItem(name)

    if (!item) return
    if (amount > item.amount || amount <= 0) return

    if (amount === item.amount) {
      delete this.inventory[name]
    } else {
      this.inventory[name] = {
        ...this.inventory[name],
        amount: (item.amount as number) - amount,
      }
    }

    this.weight = this.weight - amount * ItemsService.getItemWeight(name)

    cb && typeof cb === 'function' && cb()
  }

  async addInventoryItem(name: string, amount: number, cb?: Function) {
    const isItemValid = ItemsService.isValidItem(name)
    if (isItemValid) {
      console.log(`Added item to player ${this.getName()}`)
      const item = this.hasItem(name)

      amount = ~~amount

      if (item) {
        this.inventory[name] = {
          ...this.inventory[name],
          amount: item.amount + amount,
        }
      } else {
        this.inventory[name] = {
          type: ItemsService.getItemType(name),
          amount: amount,
        }
      }

      this.weight = this.weight + amount * ItemsService.getItemWeight(name)

      cb && typeof cb === 'function' && cb(this.inventory[name])
    }
  }
}

export default _Player
