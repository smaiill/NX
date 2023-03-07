import { ItemsService } from '@items/items.service'
import { JobsService } from '@jobs/jobs.service'
import {
  Configuration,
  InventoryActions,
  InventoryEvents,
  InventoryItem,
  JobCB,
  JobsEvents,
  NXPlayer,
  NXPlayerCharInfo,
  PlayerEvents,
  Position,
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
  group
  weight
  name
  source
  maxWeight
  uid
  config: Configuration
  skin

  constructor(
    identifier: string,
    charinfo: NXPlayerCharInfo,
    inventory: Record<string, InventoryItem>,
    accounts: Record<string, number>,
    position: Position,
    group: string,
    weight: number,
    name: string,
    source: number,
    uid: string,
    skin: Record<string, any>,
  ) {
    this.identifier = identifier
    this.charinfo = charinfo
    this.inventory = inventory
    this.accounts = accounts
    this.position = position
    this.group = group
    this.weight = weight
    this.name = name
    this.source = source
    this.uid = uid
    this.config = config
    this.maxWeight = this.config.player.maxWeight
    this.skin = skin
  }

  public getWeight() {
    return this.weight
  }

  public getSkin() {
    return this.skin
  }

  public getName() {
    return this.name
  }

  public getCharInfo() {
    return this.charinfo
  }

  public getIdentifier() {
    return this.identifier
  }

  public getCoords() {
    return this.position
  }

  public getInventory() {
    return this.inventory
  }

  public getAccounts() {
    return this.accounts
  }

  public getGroup() {
    return this.group
  }

  public getBloodType() {
    return this.charinfo.blood_type
  }

  public getThirst() {
    return this.charinfo.thirst
  }

  public getHunger() {
    return this.charinfo.hunger
  }

  public getMaxWeight() {
    return this.maxWeight
  }

  public getUID() {
    return this.uid
  }

  public getAccountMoney(account: string) {
    if (!config.accounts[account]) return undefined

    return this.accounts[account]
  }

  public getJob(type: number | '' = 1) {
    if (type === 1) type = ''

    const job = JobsService.findJob(this.charinfo[`job${type}`] as string)

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

  public getJobs() {
    // TODO: a function that returns all the jobs of the player.
    return []
  }

  public setThirst(value: number) {
    this.charinfo.thirst = value
  }

  public setSkin(skin: Record<string, string>) {
    this.skin = skin

    // TODO: Update locale cache !
  }

  public setHunger(value: number) {
    this.charinfo.hunger = value
  }

  public setGroup(permission: string) {
    this.group = permission

    this.emitEvent(PlayerEvents.UPDATE_LOCALE_CACHE_BY_KEY, {
      key: 'group',
      value: this.group,
    })
  }

  public setAccountMoney(account: string, money: number) {
    if (!(account in this.accounts) || !money) return

    money = Math.trunc(money)

    this.accounts[account] = money

    this.emitEvent(PlayerEvents.UPDATE_LOCALE_CACHE_BY_KEY, {
      key: 'accounts',
      value: this.accounts,
    })
  }

  public setJob(
    name: string,
    grade: string,
    type: number,
    cb?: (res: JobCB) => void,
  ) {
    const isValid = JobsService.isValid(name, grade, type)

    if (!isValid) return

    if (type === 1) {
      this.charinfo.job = name
      this.charinfo.job_grade = grade

      this.emitEvent(JobsEvents.JOB_UPDATED, {
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

    this.emitEvent(PlayerEvents.UPDATE_LOCALE_CACHE_BY_KEY, {
      key: 'charinfo',
      value: this.charinfo,
    })

    cb?.({
      job: name,
      job_grade: grade,
      type,
    })
  }

  public setCoords(x: number, y: number, z: number, heading: number) {
    this.position = {
      x: parseFloat(x.toFixed(3)),
      y: parseFloat(y.toFixed(3)),
      z: parseFloat(z.toFixed(3)),
      heading: parseFloat(heading.toFixed(3)),
    }

    return
  }

  public setCharInfoKey(key: string | string[], value: string | string[]) {
    if (Array.isArray(key) && Array.isArray(value)) {
      for (let i = 0; i < key.length; i++) {
        this.charinfo[key[i]] = value[i]
      }

      return
    }

    this.emitEvent(PlayerEvents.UPDATE_LOCALE_CACHE_BY_KEY, {
      key: 'charinfo',
      value: this.charinfo,
    })
  }

  public emitEvent(name: string, ...args: unknown[]) {
    emitNet(name, this.source, ...args)
  }

  public hasItem(name: string) {
    const item = this.inventory[name]

    if (!item) return false

    return item
  }

  public removeItem(name: string, amount: number, cb?: ResponseCB) {
    const item = this.hasItem(name)

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

    let count = 0

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

  public canTakeItem(name: string, amount: number) {
    if (
      this.weight + amount * ItemsService.getItemWeight(name) >
      this.maxWeight
    ) {
      return false
    }

    return true
  }

  public addItem(name: string, amount: number, cb?: ResponseCB) {
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

    const canTakeItem = this.canTakeItem(name, amount)
    if (!canTakeItem) {
      cb?.({
        ok: false,
        message: `Player cant take item: ${name}`,
      })
      return
    }

    let count = 0

    const itemData = ItemsService.getItem(name)

    if (item) {
      count = item.amount + amount
      this.inventory[name] = {
        ...this.inventory[name],
        amount: item.amount + amount,
      }
    } else {
      count = amount
      if (!itemData) {
        return
      }
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

  public async save(cb?: ResponseCB) {
    PlayerDB.savePlayer({
      charinfo: this.charinfo,
      inventory: this.inventory,
      accounts: this.accounts,
      position: this.position,
      group: this.group,
      identifier: this.identifier,
      skin: this.skin,
    })
      .then(() => {
        LG.info(`Player: [${this.name}] saved with success.`)
        cb?.({ ok: true })
      })
      .catch((err) => {
        LG.error(
          `Error while saving player: [${GetPlayerName(
            this.source as unknown as string,
          )}] | ERROR: ${err}`,
        )

        cb?.({ ok: false, message: err })
      })
  }

  kick(reason = 'no reason') {
    DropPlayer(this.source as unknown as string, reason)
  }
}

export { _Player }
