import ItemsService from '../items/items.service'
import { logger } from '../utils/logger'

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

  getAccountMoney(account: string) {
    if (
      !account ||
      (account !== 'money' && account !== 'bank' && account !== 'black_money')
    ) {
      return logger.error(`Trying to acces not valid account.`)
    }

    return this.accounts[account]
  }

  hasItem(itemName: string): boolean | number {
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

    if (!item) {
      return logger.error(`You dont have item ${name}`)
    }

    if (amount > item || amount <= 0) {
      return
    }

    if (amount === item) {
      delete this.inventory[name]
    } else {
      this.inventory[name] = (item as number) - amount
    }

    cb && typeof cb === 'function' && cb()
  }

  async addInventoryItem(name: string, amount: number, cb?: Function) {
    const item = ItemsService.isValidItem(name)
    if (item) {
      const hasItem = this.hasItem(name)
      console.log(JSON.stringify(this.inventory))

      if (hasItem) {
        this.inventory[name] += amount
      } else {
        this.inventory[name] = amount
      }

      cb && typeof cb === 'function' && cb()
    }
  }

  async addMoneyToAccount(account: string, amount: number) {
    if (
      account !== 'money' &&
      account !== 'bank' &&
      account !== 'black_money'
    ) {
      return logger.error('Not Valid account !')
    }

    if (amount <= 0) return

    amount = ~~amount

    if (account !== 'bank') {
      this.addInventoryItem(account, amount)
    }

    this.accounts[account] += this.accounts[account] + amount
  }

  async removeAccountMoney(account: string, amount: number) {
    const item = await this.hasItem(account)

    if (
      account !== 'money' &&
      account !== 'bank' &&
      account !== 'black_money'
    ) {
      return logger.error('not Valid Account !')
    }
    if (amount <= 0) return

    amount = ~~amount

    if (account !== 'bank') {
      this.removeInventoryItem(account, amount)
    }

    this.accounts[account] - amount
  }
}

export default _Player
