import { LoadingBarEvents } from '../../../types/events'
import { LoadingBarDataT } from '../../../types/loadingBar'
import LoadingBarService from './loadingBar.service'

on(LoadingBarEvents.CREATE_LOADING_BAR, (data: LoadingBarDataT) => {
  LoadingBarService.create(data)
})
