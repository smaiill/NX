import { LoadingBarEvents } from '@nx/types'
import { CreationLoadingbarType } from './loaderbar.schema'
import { LoadingBarService } from './loadingBar.service'

on(LoadingBarEvents.CREATE_LOADING_BAR, (data: CreationLoadingbarType) => {
  LoadingBarService.create(data)
})
