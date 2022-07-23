export enum InputMethods {
  CREATE_INPUT = 'NX::createInput',
  SUBMIT_DATA = 'NX::inputSubmitData',
}

export interface InputRowT {
  label: string
  id: string
}

export interface InputsDataT {
  title: string
  rows: InputRowT[]
}

export interface InputSliceState {
  inputData: InputsDataT | null
}
