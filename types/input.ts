export interface InputRowT {
  label: string
  id: string
  type: 'text' | 'password' | 'color'
  required?: boolean
  options?: Record<string, string | number | boolean>
}

export interface InputsDataT {
  title: string
  rows: InputRowT[]
}

export interface InputSliceState {
  inputData: InputsDataT | null
  invalidInputs: string[]
}
