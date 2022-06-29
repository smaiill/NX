export class _Events {
  Events: any
  constructor() {
    this.Events = {}
  }

  onServerEvent(eventName: string, callback: Function) {}
}

const Events = new _Events()
export default Events
