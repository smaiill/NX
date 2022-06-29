export interface ItemI {
  name: string
  label: string
  weight: number
  type: 'normal' | 'gun'
}

export const NAFItems: ItemI[] = [
  {
    // * ITEMS NORMAL
    name: 'bread',
    label: 'Pain',
    weight: 2,
    type: 'normal',
  },
  {
    name: 'water',
    label: 'Eau',
    weight: 4,
    type: 'normal',
  },
  {
    name: 'diamond',
    label: 'Diamond',
    weight: 1,
    type: 'normal',
  },
  {
    name: 'phone',
    label: 'Telephone',
    weight: 2,
    type: 'normal',
  },
  {
    name: 'wood',
    label: 'Rondelle de bois',
    weight: 10,
    type: 'normal',
  },
  {
    name: 'fish',
    label: 'Poissons',
    weight: 6,
    type: 'normal',
  },
  {
    name: 'petrol',
    label: 'Huile',
    weight: 15,
    type: 'normal',
  },
  {
    // * ITEMS WEAPONS
    name: 'knife',
    label: 'Couteau',
    weight: 75,
    type: 'gun',
  },
]
