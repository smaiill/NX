export class _Events {
  Events: any
  constructor() {
    this.Events = {}
  }

  emitServerEvent(eventName: string, callback?: Function, ...args: any[]) {}
}

const Events = new _Events()
export default Events
