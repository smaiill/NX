import { isEnvBrowser } from './misc'

// ! Important otherwise debug wont work properly
const DEBUG_TIMER = 500 as const

export interface DebugEvent<T = unknown> {
  app: string
  method: string
  data: T
}

export const injectMockData = (events: DebugEvent[]) => {
  if (isEnvBrowser()) {
    for (const event of events) {
      setTimeout(() => {
        window.dispatchEvent(
          new MessageEvent('message', {
            data: {
              app: event.app,
              method: event.method,
              data: event.data,
            },
          }),
        )
      }, DEBUG_TIMER)
    }
  }
}
