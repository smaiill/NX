import { InventoryEeventsE, JobsEventsE } from '../../types/events'
import { ItemT } from '../../types/items'
import { RespCB } from '../../types/main'
import ItemsService from 's@items/items.service'
import JobsService from 's@jobs/jobs.service'

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
  maxWeight: number

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
    this.maxWeight = 50000000000
  }

  public getWeight(): number {
    return this.weight
  }

  public getName(): string {
    return this.name
  }

  public getCharInfo(): any {
    return this.charinfo
  }

  public getIdentifier(): string {
    return this.identifier
  }

  public getCoords(): number[] {
    return this.position
  }

  public getInventory(): any {
    return this.inventory
  }

  public getAccounts(): any {
    return this.accounts
  }

  public getPermissions(): string {
    return this.permissions
  }

  public getBloodType(): string {
    return this.charinfo.blood_type
  }

  public getThirst(): number {
    return parseFloat(this.charinfo.thirst)
  }

  public getHunger(): number {
    return parseFloat(this.charinfo.hunger)
  }

  public getMaxWeight(): number {
    return this.maxWeight
  }

  public setThirst(value: number): void {
    this.charinfo.thirst = value
  }

  public setHunger(value: number): void {
    this.charinfo.hunger = value
  }

  public getJob(type: number = 1): { name: string; grade: number } {
    if (type === 1) {
      return {
        name: this.charinfo.job,
        grade: this.charinfo.job_grade,
      }
    }

    return {
      name: this.charinfo[`job${type}`],
      grade: this.charinfo[`job${type}_grade`],
    }
  }

  public getAccountMoney(account: string): number | undefined {
    if (!account || account !== 'bank') {
      return
    }

    return this.accounts[account]
  }

  public async setJob(
    name: string,
    grade: string,
    type: number = 1,
    cb?: Function
  ): Promise<void> {
    const isValid = await JobsService.isValid(name, grade, type)

    if (!isValid) return

    console.log(this.charinfo.job, this.charinfo.job_grade)

    if (type === 1) {
      this.charinfo.job = name
      this.charinfo.job_grade = grade

      this.emitEvent(JobsEventsE.ON_JOB_UPDATED, {
        job: name,
        job_grade: grade,
        type,
      })

      cb &&
        cb({
          job: name,
          job_grade: grade,
          type,
        })
      console.log(this.charinfo.job, this.charinfo.job_grade)

      return
    }

    this.charinfo[`job${type}`] = name
    this.charinfo[`job${type}_grade`] = grade

    this.emitEvent(JobsEventsE.ON_JOB_UPDATED, {
      job: name,
      job_grade: grade,
      type,
    })
    console.log(this.charinfo.job, this.charinfo.job_grade)

    cb &&
      cb({
        job: name,
        job_grade: grade,
        type,
      })
  }

  public setCoords(x: number, y: number, z: number, heading: number): void {
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

  public emitEvent(eventName: string, ...args: any[]) {
    emitNet(eventName, this.source, ...args)
  }

  public hasItem(itemName: string): boolean | any {
    const item = this.inventory[itemName]
    if (item) {
      return item
    }

    return false
  }

  public getInventoryItem(itemName: string): ItemT | false {
    const item = this.inventory[itemName]

    if (item) {
      return item
    }

    return false
  }

  public async removeInventoryItem(
    name: string,
    amount: number,
    cb?: RespCB
  ): Promise<void> {
    const item = await this.hasItem(name)

    if (!item) {
      cb &&
        cb({
          status: 'error',
          message: `Item [${name}] not found.`,
        })
      return
    }
    if (amount > item.amount || amount <= 0) {
      cb &&
        cb({
          status: 'error',
          message: `Incorrect amount: [${amount}]`,
        })
      return
    }

    let count: number = 0

    if (amount === item.amount) {
      delete this.inventory[name]
    } else {
      count = (item.amount as number) - amount
      this.inventory[name] = {
        ...this.inventory[name],
        amount: (item.amount as number) - amount,
      }
    }

    this.weight = this.weight - amount * ItemsService.getItemWeight(name)

    this.emitEvent(InventoryEeventsE.UPDATE_INVENTORY, {
      type: 'REMOVE',
      item: {
        name,
        amount: count,
        type: ItemsService.getItemType(name),
      },
    })
    cb &&
      cb({
        status: 'succes',
        message: `Succefully removed [${amount}-${name}]`,
      })
  }

  public async canTakeItem(name: string, amount: number): Promise<boolean> {
    if (
      this.weight + amount * ItemsService.getItemWeight(name) >
      this.maxWeight
    ) {
      return false
    }

    return true
  }

  public async addInventoryItem(
    name: string,
    amount: number,
    cb?: RespCB
  ): Promise<void> {
    const isItemValid = ItemsService.isValidItem(name)
    if (!isItemValid) {
      cb &&
        cb({
          status: 'error',
          message: `Invalid item: [${name}]`,
        })
      return
    }
    const item = this.hasItem(name)

    amount = ~~amount

    const canTakeItem = await this.canTakeItem(name, amount)
    if (!canTakeItem) {
      cb &&
        cb({
          status: 'error',
          message: `Player cant take item: ${name}`,
        })
      return
    }

    let count: number = 0

    if (item) {
      count = item.amount + amount
      this.inventory[name] = {
        ...this.inventory[name],
        amount: item.amount + amount,
      }
    } else {
      count = amount
      this.inventory[name] = {
        type: ItemsService.getItemType(name),
        amount: amount,
      }
    }

    console.log(this.inventory)

    this.weight = this.weight + amount * ItemsService.getItemWeight(name)
    this.emitEvent(InventoryEeventsE.UPDATE_INVENTORY, {
      type: 'ADD',
      item: {
        name,
        amount: count,
        type: ItemsService.getItemType(name),
      },
    })
    cb &&
      cb({
        status: 'succes',
        data: this.inventory[name],
      })
  }

  kick(reason: string = 'No reason'): void {
    DropPlayer(this.source as unknown as string, reason)
  }
}

export default _Player
