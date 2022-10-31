import { MenuEventsE } from '../../../types/events'
import { NuiAPPS } from '../../../types/main'
import { KeyMapping, KeysTypes, Menu } from '../../../types/menu'
import MenuUtils from './menu.utils'
import EventsService from '@events/events.service'
import Utils from '@shared/utils/misc'

class MenuService {
  private KEYS: KeyMapping[]
  private keyInterval: number
  private Menus: Map<string, Menu>
  private actualMenu: Menu | null
  private actualIndex: number

  constructor() {
    this.KEYS = [
      {
        key: 'UP',
        description: 'Key up arrow',
        command: 'NX::keyUp',
        handler: () => this.keyHandler('UP'),
      },
      {
        key: 'DOWN',
        description: 'Key down arrow',
        command: 'NX::keyDown',
        handler: () => this.keyHandler('DOWN'),
      },
      {
        key: 'LEFT',
        description: 'Key left arrow',
        command: 'NX::keyLeft',
        handler: () => this.keyHandler('LEFT'),
      },
      {
        key: 'RIGHT',
        description: 'Key right arrow',
        command: 'NX::keyRight',
        handler: () => this.keyHandler('RIGHT'),
      },
    ]

    this.keyInterval = new Date().getTime()
    this.Menus = new Map()
    this.actualMenu = null
    this.actualIndex = 0

    this.registerKeyMappings()
  }

  private registerKeyMappings() {
    for (const key of this.KEYS) {
      RegisterKeyMapping(key.command, key.description, 'keyboard', key.key)
      RegisterCommand(key.command, key.handler, false)
    }
  }

  public keyHandler(key: KeysTypes) {
    if (this.actualMenu === null || new Date().getTime() - this.keyInterval < 5)
      return

    this.keyInterval = new Date().getTime()

    if (key === 'UP') {
      this.actualIndex--
    }

    if (key === 'DOWN') {
      this.actualIndex++
    }

    if (this.actualIndex < 0) {
      return (this.actualIndex = 0)
    }

    if (this.actualIndex > this.actualMenu.itemsLength!) {
      return (this.actualIndex = this.actualMenu.itemsLength!)
    }

    EventsService.emitNuiEvent({
      app: NuiAPPS.MENU,
      method: MenuEventsE.KEY_PRESSED,
      data: {
        key,
        index: this.actualIndex,
      },
    })
  }

  public createMenu(menu: Menu) {
    const { isValid, message } = MenuUtils.validateMenuCreation(menu)

    if (!isValid) {
      return console.log(message)
    }

    const uuid = Utils.uuid()

    menu.uuid = uuid as string
    menu.active = false

    this.Menus.set(uuid as string, menu)

    this.showMenu(uuid as string)
  }

  public showMenu(uuid: string) {
    if (!this.Menus.has(uuid)) return

    const menu = this.Menus.get(uuid)

    if (!menu) return

    if (menu?.active) return

    // @ts-ignore
    menu.active = true
    this.actualMenu = menu
    // @ts-ignore
    this.actualMenu.itemsLength = this.actualMenu.items.length - 1

    EventsService.emitNuiEvent({
      app: NuiAPPS.MENU,
      method: MenuEventsE.CREATE_MENU,
      data: menu,
    })
  }
}

export default new MenuService()
