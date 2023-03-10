export interface InputRow {
  label: string
  id: string
  type: 'text' | 'password' | 'color'
  required?: boolean
  options?: Record<string, string | number | boolean>
}

export interface InputsData {
  title: string
  rows: InputRow[]
}

export interface InputSliceState {
  inputData: InputsData | null
  invalidInputs: string[]
}
