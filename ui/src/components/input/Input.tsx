import React from 'react'
import { useSelector } from 'react-redux'
import { InputRowT } from '../../types/input'

const Input = () => {
  const inputState = useSelector((state: any) => state.input)

  // ! That's a temporary desgin.

  return (
    inputState.inputData !== null && (
      <div className="inputs-container">
        <h2>{inputState.inputData.title}</h2>

        <div className="inputs-row">
          {inputState.inputData.rows.map((input: InputRowT) => (
            <div className="input-container">
              <label id={`label-${input.id}`}>{input.label}</label>
              <input type="text" />
            </div>
          ))}
        </div>

        <button>Submit</button>
      </div>
    )
  )
}

export default Input
