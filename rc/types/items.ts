export interface PickupT {
  name: string
  amount: number
  coords: number[]
  uuid?: string
  label: string
  propsType: string
  object?: any
}
export interface ItemT {
  name: string
  label: string
  weight: number
  type: string
  props: string
}

export interface UsabeItemsT {
  [property: string]: Function
}
