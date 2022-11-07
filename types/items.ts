export interface PickupT {
  name: string
  amount: number
  coords: number[]
  uuid?: string
  label: string
  propsType: string
  object?: any
  itemType: string
}
export interface ItemT {
  name: string
  label: string
  weight: number
  type: string
  props: string
  unique: boolean
  maxInSlot: number
  data?: Record<string, any>
}

export interface UsabeItemsT {
  [property: string]: Function
}

export interface InventoryItemT extends ItemT {
  amount: number
}
