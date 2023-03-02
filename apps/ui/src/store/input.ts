import { InputsData, InputSliceState } from '@nx/types'
import { create } from 'zustand'

interface InputStore extends InputSliceState {
  createInputsRow: (data: InputsData) => void
  addInvalidInputs: (id: string) => void
  deleteInvalidInputs: () => void
  deleteInputsRow: () => void
}

const useInputStore = create<InputStore>((set) => ({
  inputData: null,
  invalidInputs: ['Hello world', 'Yes bebe'],

  createInputsRow: (inputData: InputsData) =>
    set((state: InputSliceState) => ({ ...state, inputData })),

  addInvalidInputs: (inputId: string) =>
    set((state: InputSliceState) => {
      if (state.invalidInputs.includes(inputId)) return state
      return { ...state, invalidInputs: [...state.invalidInputs, inputId] }
    }),

  deleteInvalidInputs: () =>
    set((state: InputSliceState) => ({ ...state, invalidInputs: [] })),

  deleteInputsRow: () =>
    set((state: InputSliceState) => ({ ...state, inputData: null })),
}))

export { useInputStore }
