export interface InputRowT {
  label: string
  id: string
  type: 'text' | 'password'
  required?: boolean
  options?: Record<string, string | number | boolean>
}

export interface InputsDataT {
  title: string
  rows: InputRowT[]
}
