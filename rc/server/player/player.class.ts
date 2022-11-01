import { ConfigT } from '../../../types/configs'
import {
  AccountsEventsE,
  InventoryEeventsE,
  JobsEventsE,
  PermissionsEventsE,
} from '../../../types/events'
import { InventoryItemT } from '../../../types/items'
import { InventoryActions, RespCB } from '../../../types/main'
import { NXPlayerCharInfoT, NXPlayerT } from '../../../types/player'
import { _PlayerDB } from './player.db'
import ItemsService from '@items/items.service'
import JobsService from '@jobs/jobs.service'
import { config } from '@shared/load.file'
import { logger } from '@utils/logger'

class _Player implements NXPlayerT {
  identifier
  charinfo
  inventory
  accounts
  position
  permissions
  weight
  name
  source
  maxWeight
  uid
  config: ConfigT
  jobsService: typeof JobsService

  constructor(
    identifier: string,
    charinfo: NXPlayerCharInfoT,
    inventory: any,
    accounts: any,
    position: any,
    permissions: string,
    weight: number,
    name: string,
    source: number,
    uid: string
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
    this.uid = uid
    this.config = config
    this.maxWeight = this.config.player.maxWeight
    this.jobsService = JobsService
  }

  public getWeight(): number {
    return this.weight
  }

  public getName(): string {
    return this.name
  }

  public getCharInfo(): NXPlayerCharInfoT {
    return this.charinfo
  }

  public getIdentifier(): string {
    return this.identifier
  }

  public getCoords(): number[] {
    return this.position
  }

  public getInventory(): Record<string, InventoryItemT> {
    return this.inventory
  }

  public getAccounts(): Record<string, number> {
    return this.accounts
  }

  public getPermissions(): string {
    return this.permissions
  }

  public getBloodType(): string {
    return this.charinfo.blood_type
  }

  public getThirst(): number {
    return this.charinfo.thirst
  }

  public getHunger(): number {
    return this.charinfo.hunger
  }

  public getMaxWeight(): number {
    return this.maxWeight
  }

  public getUID(): string {
    return this.uid
  }

  public getAccountMoney(account: string): number | undefined {
    if (!config.accounts[account]) return undefined

    return this.accounts[account]
  }

  public getJob(type: number | '' = 1): {
    name: string
    grade: string
    label: string
  } {
    if (type === 1) type = ''

    const job = this.jobsService.findJob(this.charinfo[`job${type}`])

    if (!job)
      return {
        name: '',
        label: '',
        grade: '',
      }

    return {
      label: job.label,
      name: job.name,
      grade: this.charinfo[`job${type}_grade`],
    }
  }

  public getJobs(): Array<{ name: string; grade: string; label: string }> {
    // TODO: a function that returns all the jobs of the player.
    return []
  }

  public setThirst(value: number): void {
    this.charinfo.thirst = value
  }

  public setHunger(value: number): void {
    this.charinfo.hunger = value
  }

  public setPermissions(permission: string): void {
    this.permissions = permission
    this.emitEvent(PermissionsEventsE.ON_PERMISSIONS_UPDATED, permission)
  }

  public setAccountMoney(account: string, money: number): void {
    if (!(account in this.accounts) || !money) return

    money = Math.trunc(money)

    this.accounts[account] = money
    this.emitEvent(AccountsEventsE.ON_ACCOUNT_UPDATED, {
      account,
      money,
    })
  }

  public async setJob(
    name: string,
    grade: string,
    type: number,
    cb?: Function
  ): Promise<void> {
    const isValid = await JobsService.isValid(name, grade, type)

    if (!isValid) return

    if (type === 1) {
      this.charinfo.job = name
      this.charinfo.job_grade = grade

      this.emitEvent(JobsEventsE.ON_JOB_UPDATED, {
        job: name,
        job_grade: grade,
        type,
      })

      cb?.({
        job: name,
        job_grade: grade,
        type,
      })

      return
    }

    this.charinfo[`job${type}`] = name
    this.charinfo[`job${type}_grade`] = grade

    this.emitEvent(JobsEventsE.ON_JOB_UPDATED, {
      job: name,
      job_grade: grade,
      type,
    })

    cb?.({
      job: name,
      job_grade: grade,
      type,
    })
  }

  public setCoords(x: number, y: number, z: number, heading: number): void {
    this.position = {
      x: parseFloat(x.toFixed(3)),
      y: parseFloat(y.toFixed(3)),
      z: parseFloat(z.toFixed(3)),
      heading: parseFloat(heading.toFixed(3)),
    }

    return
  }

  public setCharInfoKey(key: string, value: string): void {
    // ! Secure this !

    this.charinfo[key] = value
  }

  public emitEvent(name: string, ...args: any[]): void {
    emitNet(name, this.source, ...args)
  }

  public hasItem(name: string): false | any {
    const item = this.inventory[name]

    if (!item) return false

    return item
  }

  public async removeInventoryItem(
    name: string,
    amount: number,
    cb?: RespCB
  ): Promise<void> {
    const item = await this.hasItem(name)

    if (!item) {
      cb?.({
        status: 'error',
        message: `Item [${name}] not found.`,
      })
      return
    }

    if (amount > item.amount || amount <= 0) {
      cb?.({
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
      type: InventoryActions.REMOVE,
      item: {
        name,
        amount: count,
        type: ItemsService.getItemType(name),
      },
    })
    cb?.({
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
      cb?.({
        status: 'error',
        message: `Invalid item: [${name}]`,
      })
      return
    }
    const item = this.hasItem(name)

    amount = Math.trunc(amount)

    const canTakeItem = await this.canTakeItem(name, amount)
    if (!canTakeItem) {
      cb?.({
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

    this.weight = this.weight + amount * ItemsService.getItemWeight(name)
    this.emitEvent(InventoryEeventsE.UPDATE_INVENTORY, {
      type: InventoryActions.ADD,
      item: {
        name,
        amount: count,
        type: ItemsService.getItemType(name),
      },
    })
    cb?.({
      status: 'succes',
      data: this.inventory[name],
    })
  }

  async save(cb?: RespCB): Promise<void> {
    _PlayerDB
      .savePlayer({
        charinfo: this.charinfo,
        inventory: this.inventory,
        accounts: this.accounts,
        position: this.position,
        permissions: this.permissions,
        identifier: this.identifier,
      })
      .then(() => {
        logger.info(`Player: [${this.name}] saved with succes.`)
        cb?.({ status: 'succes' })
      })
      .catch((err) => {
        logger.error(
          `Error while saving player: [${GetPlayerName(
            this.source as unknown as string
          )}] | ERROR: ${err}`
        )

        cb?.({ status: 'error', message: err })
      })
  }

  kick(reason: string = 'no reason'): void {
    DropPlayer(this.source as unknown as string, reason)
  }
}

export default _Player
