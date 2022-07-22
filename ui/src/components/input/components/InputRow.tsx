import { InputRowT } from '../../../types/input'

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
        onChange={(e) => handleInputs(e, input.id)}
        type="text"
      />
    </div>
  )
}

export default InputRow
