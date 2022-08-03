import { InputRowT } from '../../types/input'
import InputRow from './components/InputRow'
import { useInputHandler } from './hooks/useInputHandler'
import { useInputServices } from './hooks/useInputService'
import { useSelector } from 'react-redux'

const Input = () => {
  const inputStateSlice = useSelector((state: any) => state.input)
  const invalidInputsState = useSelector(
    (state: any) => state.input.invalidInputs
  )

  const { handleInputs, inputsState } = useInputHandler()
  const { handleSubmitData } = useInputServices()

  return inputStateSlice.inputData !== null ? (
    <div className="inputs-container">
      <h2>{inputStateSlice.inputData.title}</h2>

      <div className="inputs-row">
        {inputStateSlice.inputData.rows.map(
          (input: InputRowT, index: number) => (
            <InputRow input={input} key={index} handleInputs={handleInputs} />
          )
        )}
      </div>
      {invalidInputsState.length > 0 && (
        <div className="invalid-inputs">
          <span>Invalid: {invalidInputsState[0]}</span>
        </div>
      )}
      <button onClick={() => handleSubmitData(inputsState)}>Submit</button>
    </div>
  ) : null
}

export default Input
