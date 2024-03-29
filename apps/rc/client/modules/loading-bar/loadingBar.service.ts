import { ExportMethod, ExportService } from '@decorators/Export'
import { EventsService } from '@modules/events/events.service'
import { LoadingBarData, LoadingBarEvents, NuiAPPS } from '@nx/types'
import { LG } from '@utils/logger'
import {
  createLoadingbarSchema,
  CreationLoadingbarType,
} from './loaderbar.schema'

@ExportService('LoadingBar')
class _LoadingBarService {
  private readonly currentLoadingBarState: {
    isActive: boolean
  }
  constructor() {
    this.currentLoadingBarState = {
      isActive: false,
    }
  }

  /**
   * This will return a boolean true if the loading bar is active otherwise false
   * @returns true or false
   * @example
   * IsActive()
   */
  @ExportMethod()
  public isActive(): boolean {
    return this.currentLoadingBarState.isActive
  }

  private setState(
    key: keyof typeof this.currentLoadingBarState,
    value: any,
  ): void {
    this.currentLoadingBarState[key] = value
  }

  /**
   * This will create a loading bar
   * @param loadingbar The loadingbar data
   * @example
   * Create({
   *  duration: 5 // in seconds,
   *  label: 'Hello world'
   * })
   */
  @ExportMethod()
  public async create(loadingbar: CreationLoadingbarType): Promise<void> {
    const res = createLoadingbarSchema.safeParse(loadingbar)

    if (!res.success) {
      LG.error(`Couldn't create Timeline invalid data: ${JSON.stringify(res)}`)
      return
    }

    const { data } = res

    this.setState('isActive', true)

    EventsService.emitNuiEvent<LoadingBarData>({
      app: NuiAPPS.LOADING_BAR,
      method: LoadingBarEvents.CREATE_LOADING_BAR,
      data,
    })

    setTimeout(() => {
      this.setState('isActive', false)
    }, data.duration * 1000)
  }
}

const LoadingBarService = new _LoadingBarService()
export { LoadingBarService }
