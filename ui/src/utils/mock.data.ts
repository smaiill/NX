import { isEnvBrowser } from './misc'

// ! Important otherwise debug wont work properly
const DEBUG_TIMER: number = 500

export interface DebugEvent {
  app: string
  method: string
  data: any
}

export const injectMockData = (events: DebugEvent[]) => {
  if (isEnvBrowser()) {
    events.forEach((event) => {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: {
              app: event.app,
              method: event.method,
              data: event.data,
            },
          })
        )
      }, DEBUG_TIMER)
    })
  }
}
