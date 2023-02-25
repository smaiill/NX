export interface Pickup {
  name: string
  amount: number
  coords: number[]
  uuid?: string
  label: string
  propsType: string
  object?: any
  itemType: string
  _unique: boolean
  maxInSlot: number
}
export interface Item {
  name: string
  label: string
  weight: number
  type: string
  props: string
  _unique: boolean
  maxInSlot: number
  data: Record<string, any>
}

export type SavedItem = Item & { id: number }

export interface UsableItem {
  [property: string]: Function
}

export interface InventoryItem extends Item {
  amount: number
}
