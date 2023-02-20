import { useLoadingBarStore } from '../../store/loadingBar'
import { LoadingBar } from './components/LoadingBar'

const LoadingBarWrapper = () => {
  const { loadingBar: loadingBarData } = useLoadingBarStore()

  return loadingBarData ? <LoadingBar {...loadingBarData} /> : null
}

export { LoadingBarWrapper }
