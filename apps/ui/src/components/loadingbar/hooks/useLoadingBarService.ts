import { LoadingBarData } from '@nx/types'
import { useLoadingBarStore } from '../../../store/loadingBar'

const useLoadingBarService = () => {
  const { createLoadingBar, removeLoadingBar } = useLoadingBarStore()

  const handleCreateLoadingBar = (data: LoadingBarData) => {
    createLoadingBar(data)
  }

  const handleRemoveLoadingBar = (i: NodeJS.Timer | undefined) => {
    i && clearInterval(i)
    removeLoadingBar()
  }

  return { handleCreateLoadingBar, handleRemoveLoadingBar }
}

export { useLoadingBarService }
