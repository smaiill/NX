import { InputRow as InputRowType } from '@nx/types'
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element
  label?: string
  onIconClick?: () => void
  description?: string
  handleInputs: Function
  input: InputRowType
}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { Icon, className, onIconClick, handleInputs, input, ...rest } = props
    const { label } = input

    return (
      <div className="input__wrapper">
        {label && <label htmlFor="input">{label}</label>}
        <div className="input__body">
          <input
            id={`input-${input.id}`}
            spellCheck="false"
            ref={ref}
            placeholder={label}
            {...rest}
            onChange={(e) => handleInputs(e.target.value, input)}
          />
          <div onClick={onIconClick} className="input__icon">
            {Icon && Icon}
          </div>
        </div>
      </div>
    )
  }
)

export { Input }
