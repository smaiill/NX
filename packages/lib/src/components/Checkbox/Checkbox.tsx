import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react'
import style from './Checkbox.module.scss'

export interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef(
  (
    props: PropsWithChildren<ICheckbox>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { children, ...rest } = props

    return (
      <div className={style.checkbox}>
        <div className={style.wrapper}>
          <input {...rest} ref={ref} type="checkbox" />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12.5L9.667 17L19 8"
              stroke="black"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {children && <label>{children}</label>}
      </div>
    )
  }
)

export default Checkbox
