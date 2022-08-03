import { InputRowT } from '../../../types/input'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const InputRow = ({
  input,
  handleInputs,
}: {
  input: InputRowT
  handleInputs: Function
}) => {
  return (
    <div className="input-container">
      <label id={`label-${input.id}`}>{input.label}</label>
      <input
        id={`input-${input.id}`}
        onChange={(e) => handleInputs(e.target.value, input)}
        type={input.type}
      />
    </div>
  )
}

export default InputRow
