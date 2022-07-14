import ItemsService from 's@items/items.service'
import JobsService from 's@jobs/jobs.service'
import { InventoryEeventsE, JobsEventsE } from '../../types/events'
import { ItemT } from '../../types/items'

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

  public setThirst(value: number): void {
    this.charinfo.thirst = value
  }

  public setHunger(value: number): void {
    this.charinfo.hunger = value
  }

  public getJob(type: number): { name: string; grade: number } {
    let job: {
      name: string
      grade: number
    } = {
      name: 'unemployed',
      grade: 0,
    }
    switch (type) {
      case 1:
        job.name = this.charinfo.job
        job.grade = this.charinfo.job_grade
        return job
      case 2:
        job.name = this.charinfo.job2
        job.grade = this.charinfo.job2_grade
        return job
      default:
        return job
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
    cb?: Function
  ): Promise<void> {
    const isValid = await JobsService.isValid(name, grade, 1)

    if (isValid) {
      this.charinfo.job = name
      this.charinfo.job_grade = grade

      this.emitEvent(JobsEventsE.JOB_UPDATED, { job: name, job_grade: grade })
      cb && cb()
    }
  }

  public async setJob2(
    name: string,
    grade: string,
    cb?: Function
  ): Promise<void> {
    const isValid = await JobsService.isValid(name, grade, 2)

    if (isValid) {
      this.charinfo.job2 = name
      this.charinfo.job2_grade = grade

      this.emitEvent(JobsEventsE.JOB2_UPDATED, { job: name, job_grade: grade })
      cb && cb()
    }
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
    cb?: Function
  ): Promise<void> {
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

    this.emitEvent(InventoryEeventsE.ITEM_REMOVED, {
      weight: this.weight,
      item: {
        name,
        amount,
      },
    })
    cb && typeof cb === 'function' && cb()
  }

  public async canTakeItem(name: string, amount: number): Promise<boolean> {
    console.log(this.weight + amount * ItemsService.getItemWeight(name))
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
    cb?: Function
  ): Promise<void> {
    const isItemValid = ItemsService.isValidItem(name)
    if (isItemValid) {
      const item = this.hasItem(name)

      amount = ~~amount

      const canTakeItem = await this.canTakeItem(name, amount)
      if (!canTakeItem) return

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
      this.emitEvent(InventoryEeventsE.ITEM_ADDED, {
        weight: this.weight,
        item: {
          name,
          amount,
        },
      })
      cb && typeof cb === 'function' && cb(this.inventory[name])
    }
  }
}

export default _Player
