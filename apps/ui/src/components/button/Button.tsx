import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
} from 'react'

export type IButtonTypes = 'primary' | 'danger' | 'success'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bType: IButtonTypes
  prefixElement?: JSX.Element
  suffixElement?: JSX.Element
  loading?: boolean
  href?: string
}

export type ForwardButton = Omit<ButtonProps, 'bType'>

const Button = forwardRef(
  (
    props: PropsWithChildren<ButtonProps>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      children,
      prefixElement,
      suffixElement,
      className,
      bType,
      loading,
      ...rest
    } = props

    return (
      <button
        className={`btn ${className} ${bType} ${loading ? 'loading' : ''}`}
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

export { Button }
