import { LoadingBarData, LoadingBarEvents } from '@nx/types'
import { LoadingBarService } from './loadingBar.service'

on(LoadingBarEvents.CREATE_LOADING_BAR, (data: LoadingBarData) => {
  LoadingBarService.create(data)
})
