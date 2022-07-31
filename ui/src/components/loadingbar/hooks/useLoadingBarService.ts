import {
  createLoadingBar,
  removeLoadingBar,
} from '../../../features/loadingBar/loadingBar.slice'
import { LoadingBarDataT } from '../../../types/loadingBar'
import React from 'react'
import { useDispatch } from 'react-redux'

const useLoadingBarService = () => {
  const dispatch = useDispatch()

  const handleCreateLoadingBar = ({
    duration,
    label,
    style,
  }: LoadingBarDataT) => {
    dispatch(createLoadingBar({ duration, label, style }))
  }

  const handleRemoveLoadingBar = (i?: number) => {
    i && clearInterval(i)
    dispatch(removeLoadingBar())
  }

  return { handleCreateLoadingBar, handleRemoveLoadingBar }
}

export default useLoadingBarService
