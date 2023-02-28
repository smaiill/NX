import React, {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react'
import { cls } from '../../utils'
import style from './Button.module.scss'

export type IButtonTypes = 'primary' | 'danger' | 'success' | 'warn'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  _type: IButtonTypes
  prefixElement?: JSX.Element
  suffixElement?: JSX.Element
  loading?: boolean
}

export type ForwardButton = Omit<IButton, '_type'>

const Button = forwardRef(
  (props: PropsWithChildren<IButton>, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      children,
      prefixElement,
      suffixElement,
      className,
      _type,
      loading,
      ...rest
    } = props

    return (
      <button
        className={cls(style.btn, style[_type], loading ? style.loading : '')}
        ref={ref}
        {...rest}
      >
        {prefixElement}
        {children}
        {suffixElement}
      </button>
    )
  }
)

export const ButtonPrimary = forwardRef(
  (props: ForwardButton, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button {...props} ref={ref} _type="primary" />
  }
)

export const ButtonDanger = forwardRef(
  (props: ForwardButton, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button {...props} ref={ref} _type="danger" />
  }
)

export const ButtonSuccess = forwardRef(
  (props: ForwardButton, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button {...props} ref={ref} _type="success" />
  }
)

export const ButtonWarn = forwardRef(
  (props: ForwardButton, ref: ForwardedRef<HTMLButtonElement>) => {
    return <Button {...props} ref={ref} _type="warn" />
  }
)
