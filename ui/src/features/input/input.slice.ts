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
  },
})

export const { createInputsRow } = inputSlice.actions
export default inputSlice.reducer
