import { useSelector } from 'react-redux'
import { InputRowT } from '../../types/input'
import { injectMockData } from '../../utils/mock.data'
import InputRow from './components/InputRow'
import { useInputHandler } from './hooks/useInputHandler'

const Input = () => {
  const inputStateSlice = useSelector((state: any) => state.input)

  const { handleInputs, inputsState } = useInputHandler()

  const handleSubmitData = () => {
    console.log(inputsState)
  }

  return (
    inputStateSlice.inputData !== null && (
      <div className="inputs-container">
        <h2>{inputStateSlice.inputData.title}</h2>

        <div className="inputs-row">
          {inputStateSlice.inputData.rows.map(
            (input: InputRowT, index: number) => (
              <InputRow input={input} key={index} handleInputs={handleInputs} />
            )
          )}
        </div>

        <button onClick={handleSubmitData}>Submit</button>
      </div>
    )
  )
}

export default Input

injectMockData([
  {
    app: 'NX::input',
    method: 'NX::createInput',
    data: {
      title: 'Set group',
      rows: [
        {
          label: 'Name',
          id: 'name',
        },
        {
          label: 'Amount',
          id: 'amount',
        },
      ],
    },
  },
])
