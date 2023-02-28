import React, {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import { cls } from '../../utils'
import style from './Layouts.module.scss'

export type ITypes = 'primary' | 'secondary' | 'invisible'

export interface IContainer extends HTMLAttributes<HTMLDivElement> {
  _type: ITypes
}

export interface IContainerChildren extends Omit<IContainer, '_type'> {}

const ContainerBase = forwardRef(
  (props: PropsWithChildren<IContainer>, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, className, _type, ...rest } = props
    return (
      <div
        {...rest}
        ref={ref}
        className={cls(style.container, className, style[_type])}
      >
        {children}
      </div>
    )
  }
)

const ContainerPrimary = forwardRef(
  (
    props: PropsWithChildren<IContainerChildren>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { children, ...rest } = props
    return (
      <ContainerBase ref={ref} {...rest} _type="primary">
        {children}
      </ContainerBase>
    )
  }
)

const ContainerSecondary = forwardRef(
  (
    props: PropsWithChildren<IContainerChildren>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { children, ...rest } = props
    return (
      <ContainerBase ref={ref} {...rest} _type="secondary">
        {children}
      </ContainerBase>
    )
  }
)

const Container = forwardRef(
  (
    props: PropsWithChildren<IContainerChildren>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { children, ...rest } = props
    return (
      <ContainerBase ref={ref} {...rest} _type="invisible">
        {children}
      </ContainerBase>
    )
  }
)

export { Container, ContainerPrimary, ContainerSecondary }
