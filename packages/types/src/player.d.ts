import { InventoryItem } from './items'
import { JobCB } from './jobs'
import { ResponseCB } from './main'

export type BloodTypes = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface NXPlayerCharInfo {
  firstname: string
  lastname: string
  dob: string
  nationality: string
  sex: 'female' | 'male'
  hunger: number
  thirst: number
  blood_type: BloodTypes
  [key: string]: any
}

export interface NXPlayerMethods {
  getWeight(): number
  getName(): string
  getCharInfo(): NXPlayerCharInfo
  getIdentifier(): string
  getCoords(): Position
  getInventory(): Record<string, InventoryItem>
  getAccounts(): Record<string, number>
  getGroup(): string
  getBloodType(): string
  getThirst(): number
  getHunger(): number
  getMaxWeight(): number
  getUID(): string
  getAccountMoney(account: string): number | undefined
  getJob(type: number): { name: string; grade: string; label: string }
  getJobs(): Array<{ name: string; grade: string; label: string }>
  setThirst(value: number): void
  setHunger(value: number): void
  setGroup(permission: string): void
  setAccountMoney(account: string, money: number): void
  setJob(
    name: string,
    grade: string,
    type: number,
    cb?: (res: JobCB) => void,
  ): void
  setCoords(x: number, y: number, z: number, heading: number): void
  emitEvent(name: string, ...args: unknown[]): void
  hasItem(name: string): boolean | InventoryItem
  removeItem(name: string, amount: number, cb?: ResponseCB): void
  setCharInfoKey(key: string, value: string): void
  addItem(name: string, amount: number, cb?: ResponseCB): void
  save(cb?: ResponseCB): Promise<void>
  kick(reason: string): void
}

export type NXPlayerMethodsCapitalized = {
  [P in keyof NXPlayerMethods as Capitalize<P>]: NXPlayerMethods[P]
}

export interface Position {
  x: number
  y: number
  z: number
  heading: number
}

export interface NXPlayer extends NXPlayerMethods {
  identifier: string
  charinfo: NXPlayerCharInfo
  inventory: Record<string, InventoryItem>
  accounts: Record<string, number>
  position: Position
  group: string
  weight: number
  name: string
  source: number
  maxWeight: number
  uid: string
  skin: Record<string, number | string>
}
