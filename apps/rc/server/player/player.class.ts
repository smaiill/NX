import { ItemsService } from '@items/items.service'
import { JobsService } from '@jobs/jobs.service'
import {
  AccountsEvents,
  Configuration,
  InventoryActions,
  InventoryEvents,
  InventoryItem,
  JobsEvents,
  NXPlayer,
  NXPlayerCharInfo,
  PermissionsEvents,
  ResponseCB,
} from '@nx/types'
import { config } from '@shared/load.file'
import { LG } from '@utils/logger'
import { PlayerDB } from './player.db'

class _Player implements NXPlayer {
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
  config: Configuration

  constructor(
    identifier: string,
    charinfo: NXPlayerCharInfo,
    inventory: Record<string, InventoryItem>,
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
  }

  public getWeight(): number {
    return this.weight
  }

  public getName(): string {
    return this.name
  }

  public getCharInfo(): NXPlayerCharInfo {
    return this.charinfo
  }

  public getIdentifier(): string {
    return this.identifier
  }

  public getCoords(): number[] {
    return this.position
  }

  public getInventory(): Record<string, InventoryItem> {
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

    const job = JobsService.findJob(this.charinfo[`job${type}`])

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
    this.emitEvent(PermissionsEvents.ON_PERMISSIONS_UPDATED, permission)
  }

  public setAccountMoney(account: string, money: number): void {
    if (!(account in this.accounts) || !money) return

    money = Math.trunc(money)

    this.accounts[account] = money
    this.emitEvent(AccountsEvents.ON_ACCOUNT_UPDATED, {
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

      this.emitEvent(JobsEvents.ON_JOB_UPDATED, {
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

    this.emitEvent(JobsEvents.ON_JOB_UPDATED, {
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

  public setCharInfoKey(
    key: string | string[],
    value: string | string[]
  ): void {
    if (Array.isArray(key) && Array.isArray(value)) {
      for (let i = 0; i < key.length; i++) {
        this.charinfo[key[i]] = value[i]
      }

      return
    }

    // @ts-ignore
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
    cb?: ResponseCB
  ): Promise<void> {
    const item = await this.hasItem(name)

    if (!item) {
      cb?.({
        ok: false,
        message: `Item [${name}] not found.`,
      })
      return
    }

    if (amount > item.amount || amount <= 0) {
      cb?.({
        ok: false,
        message: `Incorrect amount: [${amount}]`,
      })
      return
    }

    let count: number = 0

    const itemData = ItemsService.getItem(name)

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

    this.emitEvent(InventoryEvents.UPDATE_INVENTORY, {
      type: InventoryActions.REMOVE,
      item: {
        amount: count,
        ...itemData,
      },
    })
    cb?.({
      ok: true,
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
    cb?: ResponseCB
  ): Promise<void> {
    const isItemValid = ItemsService.isValidItem(name)
    if (!isItemValid) {
      cb?.({
        ok: false,
        message: `Invalid item: [${name}]`,
      })
      return
    }
    const item = this.hasItem(name)

    amount = Math.trunc(amount)

    const canTakeItem = await this.canTakeItem(name, amount)
    if (!canTakeItem) {
      cb?.({
        ok: false,
        message: `Player cant take item: ${name}`,
      })
      return
    }

    let count: number = 0

    const itemData = ItemsService.getItem(name)

    if (item) {
      count = item.amount + amount
      this.inventory[name] = {
        ...this.inventory[name],
        amount: item.amount + amount,
      }
    } else {
      count = amount
      // @ts-ignore
      this.inventory[name] = {
        ...itemData,
        amount: amount,
      }
    }

    this.weight = this.weight + amount * ItemsService.getItemWeight(name)
    this.emitEvent(InventoryEvents.UPDATE_INVENTORY, {
      type: InventoryActions.ADD,
      item: {
        ...itemData,
        amount: count,
      },
    })
    cb?.({
      ok: true,
      data: this.inventory[name],
    })
  }

  async save(cb?: ResponseCB): Promise<void> {
    PlayerDB.savePlayer({
      charinfo: this.charinfo,
      inventory: this.inventory,
      accounts: this.accounts,
      position: this.position,
      permissions: this.permissions,
      identifier: this.identifier,
    })
      .then(() => {
        LG.info(`Player: [${this.name}] saved with success.`)
        cb?.({ ok: true })
      })
      .catch((err) => {
        LG.error(
          `Error while saving player: [${GetPlayerName(
            this.source as unknown as string
          )}] | ERROR: ${err}`
        )

        cb?.({ ok: false, message: err })
      })
  }

  kick(reason: string = 'no reason'): void {
    DropPlayer(this.source as unknown as string, reason)
  }
}

export { _Player }
