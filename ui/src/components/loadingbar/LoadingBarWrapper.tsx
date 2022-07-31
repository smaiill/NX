import { LoadingBarDataT, LoadingBarState } from '../../types/loadingBar'
import LoadingBar from './components/LoadingBar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LoadingBarWrapper = () => {
  const loadingBarData = useSelector(
    (state: any) => state.loadingBar.loadingBar
  )

  return loadingBarData && <LoadingBar data={loadingBarData} />
}

export default LoadingBarWrapper
