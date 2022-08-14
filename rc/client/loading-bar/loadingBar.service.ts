import { LoadingBarEventsE } from '../../../types/events'
import { LoadingBarDataT } from '../../../types/loadingBar'
import { NuiAPPS } from '../../../types/main'
import { DefaultDataT } from '../../../types/misc'
import { overWriteData } from '@shared/utils/def'
import EventsService from 'c@events/events.service'

class _LoadingBarService {
  private readonly currentLoadingBarState: {
    isActive: boolean
  }
  constructor() {
    this.currentLoadingBarState = {
      isActive: false,
    }
  }

  public isActive(): boolean {
    return this.currentLoadingBarState.isActive
  }

  private setState(
    key: keyof typeof this.currentLoadingBarState,
    value: any
  ): void {
    this.currentLoadingBarState[key] = value
  }

  public async create(data: LoadingBarDataT): Promise<void> {
    const overWritedData = await overWriteData<LoadingBarDataT>(
      DefaultDataT.LOADING_BAR,
      data
    )

    this.setState('isActive', true)

    EventsService.emitNuiEvent({
      app: NuiAPPS.LOADING_BAR,
      method: LoadingBarEventsE.CREATE_LOADING_BAR,
      data: overWritedData,
    })

    setTimeout(() => {
      this.setState('isActive', false)
    }, overWritedData.duration * 1000)
  }
}

const LoadingBarService = new _LoadingBarService()
export default LoadingBarService
