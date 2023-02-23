import { InventoryItem } from './items'
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
  getPermissions(): string
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
  setPermissions(permission: string): void
  setAccountMoney(account: string, money: number): void
  setJob(name: string, grade: string, type: number, cb?: Function): void
  setCoords(x: number, y: number, z: number, heading: number): void
  emitEvent(name: string, ...args: any[]): void
  hasItem(name: string): boolean | any
  removeInventoryItem(name: string, amount: number, cb?: ResponseCB): void
  canTakeItem(name: string, amount: number): boolean
  setCharInfoKey(key: string, value: string): void
  addInventoryItem(name: string, amount: number, cb?: ResponseCB): void
  save(cb?: ResponseCB): Promise<void>
  kick(reason: string): void
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
  permissions: string
  weight: number
  name: string
  source: number
  maxWeight: number
  uid: string
  skin?: any
}

export interface PlayerDataBase {
  id: number
  identifier: string
  accounts: string
  permissions: string
  inventory: null | any
  charinfo: any
  position: Position
  skin: any
  uid: string
  created_at: string
  updated_at: string
}

export interface PlayerMessage {
  message: string
}
