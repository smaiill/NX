import { isEnvBrowser } from './misc'

// IMPORTANT otherwise debug wont work properly
const DEBUG_TIMER: number = 100

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
