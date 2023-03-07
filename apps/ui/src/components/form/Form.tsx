import { ButtonPrimary, Input } from '@nx/lib'
import { InputRow as InputRowType } from '@nx/types'
import { FormEvent } from 'react'
import { useInputStore } from '../../store/input'
import { useInputHandler } from './hooks/useInputHandler'
import { useInputServices } from './hooks/useInputService'

const Form = () => {
  const { inputData } = useInputStore()

  const { handleInputs, inputsState } = useInputHandler()
  const { handleSubmitData } = useInputServices()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmitData(inputsState)
  }

  return inputData !== null ? (
    <form onSubmit={onSubmit} className="form__container">
      <h2>{inputData.title}</h2>

      <div className="form__body">
        {inputData.rows.map((input: InputRowType) => (
          <Input
            {...input}
            key={input.id}
            onChange={({ target }) => handleInputs(target.value, input)}
          />
        ))}

        <ButtonPrimary>Send</ButtonPrimary>
      </div>
    </form>
  ) : null
}

export { Form }
