import { InputSliceState, InputsDataT } from '../../../../types/input'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: InputSliceState = {
  inputData: null,
  invalidInputs: [],
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    createInputsRow: (state, action: PayloadAction<InputsDataT>) => {
      state.inputData = action.payload
    },

    addInvalidInputs: (state, action: PayloadAction<string>) => {
      if (state.invalidInputs.find((inputId) => inputId === action.payload))
        return
      state.invalidInputs = [...state.invalidInputs, action.payload]
    },

    deleteInvalidInputs: (state) => {
      state.invalidInputs = []
    },

    deleteInputsRow: (state) => {
      state.inputData = null
    },
  },
})

export const {
  createInputsRow,
  deleteInputsRow,
  addInvalidInputs,
  deleteInvalidInputs,
} = inputSlice.actions
export default inputSlice.reducer
