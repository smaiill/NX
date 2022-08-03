import { InputSliceState, InputsDataT } from '../../types/input'
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

    addInvalidInput: (state, action: PayloadAction<string>) => {
      if (state.invalidInputs.find((inputId) => inputId === action.payload))
        return
      state.invalidInputs = [...state.invalidInputs, action.payload]
    },

    deleteInputsRow: (state) => {
      state.inputData = null
    },
  },
})

export const { createInputsRow, deleteInputsRow, addInvalidInput } =
  inputSlice.actions
export default inputSlice.reducer
