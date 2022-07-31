import LoadingBar from './components/LoadingBar'
import { useSelector } from 'react-redux'

const LoadingBarWrapper = () => {
  const loadingBarData = useSelector(
    (state: any) => state.loadingBar.loadingBar
  )

  return loadingBarData && <LoadingBar data={loadingBarData} />
}

export default LoadingBarWrapper
