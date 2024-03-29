import { ExportMethod, ExportService } from '@decorators/Export'
import { EventsService } from '@modules/events/events.service'
import {
  InputEvents,
  InputsData,
  NuiAPPS,
  Response,
  ResponseCB,
} from '@nx/types'
import { LG } from '@utils/logger'
import { InputUtils } from './input.utils'

type HandlerCB = (res: Response<unknown>) => void
type HandlerCBNullish = HandlerCB | null

@ExportService('Input')
class _InputService {
  private inputUtils: typeof InputUtils
  private readonly currentInputState: {
    active: boolean
    handler: HandlerCBNullish
    data: InputsData | null
  }
  constructor() {
    this.currentInputState = {
      active: false,
      handler: null,
      data: null,
    }
    this.inputUtils = InputUtils
  }

  /**
   * This will return true if the input is active otherwise false
   * @returns true or false
   */
  @ExportMethod()
  public isActive(): boolean {
    return this.currentInputState.active
  }

  private setState(key: keyof typeof this.currentInputState, value: any): void {
    this.currentInputState[key] = value
  }

  /**
   * This will destroy the current form
   * @param cb The callback that well be execuetd when the form is submited
   */
  @ExportMethod()
  public destroy(cb?: ResponseCB): void {
    if (!this.isActive()) {
      cb?.({
        ok: false,
        message: 'no input detected.',
      })
      return
    }

    this.setState('handler', null)
    this.setState('active', false)
    EventsService.emitNuiEvent<void>({
      app: NuiAPPS.INPUT,
      method: InputEvents.DESTROY_INPUT,
    })
    cb?.({
      ok: true,
      message: 'input deleted.',
    })
  }

  /**
   * This will create a form
   * @param data The data of the form
   * @param handler A callback function that will be executed with the data when the form is submited
   */
  @ExportMethod()
  public create(data: InputsData, handler: () => void): void {
    if (this.isActive()) {
      return LG.error(`another input already showed.`)
    }

    if (!data || (handler && typeof handler !== 'function')) {
      return LG.error('incorrect input creation arguments.')
    }

    EventsService.emitNuiEvent<InputsData>(
      {
        app: NuiAPPS.INPUT,
        method: InputEvents.CREATE_INPUT,
        data,
      },
      true,
    )

    this.setState('handler', handler)
    this.setState('data', data)
    this.setState('active', true)
  }

  public async handleResponse(res: Response, cb: ResponseCB): Promise<void> {
    if (
      typeof this.currentInputState.handler === 'function' &&
      this.currentInputState.active
    ) {
      const { isValid, message } = await this.inputUtils.isDataValid(
        res.data,
        this.currentInputState.data as InputsData,
      )

      if (!isValid) {
        cb({ ok: false, message: message })
        return
      }

      this.currentInputState.handler(res)
      this.setState('handler', null)
      this.setState('active', false)
      this.setState('data', null)

      SetNuiFocus(false, false)

      cb({ ok: true, message: 'succefully removed.' })
      return
    }

    cb({ ok: false, message: 'error while removing.' })
  }
}

const InputService = new _InputService()
export { InputService }
