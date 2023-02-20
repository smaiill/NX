export interface Pickup {
  name: string
  amount: number
  coords: number[]
  uuid?: string
  label: string
  propsType: string
  object?: any
  itemType: string
  unique: boolean
  maxInSlot: number
}
export interface Item {
  name: string
  label: string
  weight: number
  type: string
  props: string
  unique: boolean
  maxInSlot: number
  data?: Record<string, any>
}

export interface UsableItem {
  [property: string]: Function
}

export interface InventoryItem extends Item {
  amount: number
}
