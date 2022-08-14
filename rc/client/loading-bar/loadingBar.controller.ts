import { LoadingBarEventsE } from '../../../types/events'
import { LoadingBarDataT } from '../../../types/loadingBar'
import LoadingBarService from './loadingBar.service'

on(LoadingBarEventsE.CREATE_LOADING_BAR, (data: LoadingBarDataT) => {
  LoadingBarService.create(data)
})
