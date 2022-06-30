export class _Events {
  Events: any
  constructor() {
    this.Events = {}
  }

  async onServerEvent(eventName: string, callback: Function) {
    const eventHandler = (respEventName: string, ...args: any[]) => {
      this.Events[eventName](...args, (...respArgs: any[]) => {
        emitNet(respEventName, globalThis.source, ...respArgs)
      })
    }

    // ! Not working !
    if (eventName in this.Events) {
      removeEventListener(eventName, eventHandler)
    }
    this.Events[eventName] = callback
    onNet(eventName, eventHandler)
  }
}

const Events = new _Events()
export default Events
