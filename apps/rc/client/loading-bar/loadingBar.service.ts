import { EventsService } from '@events/events.service'
import {
  DefaultData,
  LoadingBarData,
  LoadingBarEvents,
  NuiAPPS,
} from '@nx/types'
import { overWriteData } from '@shared/utils/def'

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

  public async create(data: LoadingBarData): Promise<void> {
    const overWritedData = await overWriteData<LoadingBarData>(
      DefaultData.LOADING_BAR,
      data
    )

    this.setState('isActive', true)

    EventsService.emitNuiEvent<LoadingBarData>({
      app: NuiAPPS.LOADING_BAR,
      method: LoadingBarEvents.CREATE_LOADING_BAR,
      data: overWritedData,
    })

    setTimeout(() => {
      this.setState('isActive', false)
    }, overWritedData.duration * 1000)
  }
}

const LoadingBarService = new _LoadingBarService()
export { LoadingBarService }
