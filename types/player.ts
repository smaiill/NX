import { InventoryItemT } from './items'
import { RespCB } from './main'

export type BloodTypes = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface NXPlayerCharInfoT {
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

export interface NXPlayerMethodsT {
  getWeight(): number
  getName(): string
  getCharInfo(): NXPlayerCharInfoT
  getIdentifier(): string
  getCoords(): number[]
  getInventory(): Record<string, InventoryItemT>
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
  setJob(
    name: string,
    grade: string,
    type: number,
    cb?: Function
  ): Promise<void>
  setCoords(x: number, y: number, z: number, heading: number): void
  emitEvent(name: string, ...args: any[]): void
  hasItem(name: string): boolean | any
  removeInventoryItem(name: string, amount: number, cb?: RespCB): Promise<void>
  canTakeItem(name: string, amount: number): Promise<boolean>
  addInventoryItem(name: string, amount: number, cb?: RespCB): Promise<void>
  save(cb?: RespCB): Promise<void>
  kick(reason: string): void
}

export interface NXPlayerT extends NXPlayerMethodsT {
  identifier: string
  charinfo: NXPlayerCharInfoT
  inventory: Record<string, InventoryItemT>
  accounts: Record<string, number>
  position: {
    x: number
    y: number
    z: number
    heading: number
  }
  permissions: string
  weight: number
  name: string
  source: number
  maxWeight: number
  uid: string
}

export interface PlayerDataBaseT {
  id: number
  identifier: string
  accounts: string
  permissions: string
  inventory: null | any
  charinfo: any
  position: string
  skin: null | string
  uid: string
  created_at: string
  updated_at: string
}

export interface PlayerMessage {
  message: string
}
