import { On } from '@decorators/Event'
import { LoadingBarEvents } from '@nx/types'
import { CreationLoadingbarType } from './loaderbar.schema'
import { LoadingBarService } from './loadingBar.service'

export class LoadingBarController {
  @On(LoadingBarEvents.CREATE_LOADING_BAR)
  public handleCreateLoadingBar(data: CreationLoadingbarType) {
    LoadingBarService.create(data)
  }
}
