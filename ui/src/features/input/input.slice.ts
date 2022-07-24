import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InputsDataT, InputSliceState } from '../../types/input'

const initialState: InputSliceState = {
  inputData: null,
}

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    createInputsRow: (state, action: PayloadAction<InputsDataT>) => {
      state.inputData = action.payload
    },

    deleteInputsRow: (state) => {
      state.inputData = null
    },
  },
})

export const { createInputsRow, deleteInputsRow } = inputSlice.actions
export default inputSlice.reducer
