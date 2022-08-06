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

export interface NXPlayerT {
  identifier: string
  charinfo: NXPlayerCharInfoT
  inventory: Record<string, { amount: number; type: string }>
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
}
