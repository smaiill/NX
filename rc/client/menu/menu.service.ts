import { MenuEventsE } from '../../../types/events'
import { NuiAPPS } from '../../../types/main'
import {
  KeyMapping,
  KeysTypes,
  KeysTypesE,
  Menu,
  MenuItemTypesE,
} from '../../../types/menu'
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
      {
        key: 'RETURN',
        description: 'Key RETURN',
        command: 'NX::keyReturn',
        handler: () => this.keyHandler('RETURN'),
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

    if (key === KeysTypesE.UP || key === KeysTypesE.DOWN) {
      if (key === KeysTypesE.UP) {
        this.actualIndex--
      }

      if (key === KeysTypesE.DOWN) {
        this.actualIndex++
      }

      if (key === KeysTypesE.UP && this.actualIndex < 0) {
        return (this.actualIndex = 0)
      }

      if (
        key === KeysTypesE.DOWN &&
        this.actualIndex > this.actualMenu.itemsLength!
      ) {
        return (this.actualIndex = this.actualMenu.itemsLength!)
      }

      if (this.actualMenu.items[this.actualIndex].type === 'SEPARATOR') {
        let i = this.actualIndex

        key === KeysTypesE.DOWN ? i++ : i--

        const nextItem = this.actualMenu.items[i]

        // ! Check all the next items cause nextItem can be separator too !

        if (!nextItem) return

        key === KeysTypesE.DOWN ? this.actualIndex++ : this.actualIndex--
      }

      EventsService.emitNuiEvent({
        app: NuiAPPS.MENU,
        method: MenuEventsE.KEY_PRESSED,
        data: {
          key,
          index: this.actualIndex,
        },
      })
      return
    }

    if (key === KeysTypesE.LEFT || key === KeysTypesE.RIGHT) {
      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemTypesE.SLIDER
      ) {
        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEventsE.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            type: MenuItemTypesE.SLIDER,
          },
        })
      }

      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemTypesE.LIST
      ) {
        const item = this.findItemChoices(this.actualIndex)

        if (key === KeysTypesE.LEFT) {
          item.actualChoice--
        }

        if (key === KeysTypesE.RIGHT) {
          item.actualChoice++
        }

        if (item.actualChoice > item.maxChoices) {
          return (item.actualChoice = item.maxChoices)
        }

        if (item.actualChoice < 0) {
          return (item.actualChoice = 0)
        }

        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEventsE.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            choiceIndex: item.actualChoice,
            type: MenuItemTypesE.LIST,
          },
        })
      }
    }

    if (key === KeysTypesE.RETURN) {
      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemTypesE.CHECKBOX
      ) {
        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEventsE.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            type: MenuItemTypesE.CHECKBOX,
          },
        })
      }
    }
  }

  private findItemChoices(index: number) {
    const item = this.actualMenu?.listChoices.find(
      (list: any) => list.itemID === index
    )

    return item
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

    return {
      ShowMenu: () => this.showMenu(menu.uuid as string),
      HideMenu: () => this.hideMenu(menu.uuid as string),
    }
  }

  public hideMenu(uuid: string) {
    if (!this.Menus.has(uuid)) return

    const menu = this.Menus.get(uuid)

    if (!menu) return

    if (menu.active) {
      menu.active = false
      this.actualMenu = null
    }

    EventsService.emitNuiEvent({
      app: NuiAPPS.MENU,
      method: MenuEventsE.HIDE_MENU,
    })
  }

  public showMenu(uuid: string) {
    if (!this.Menus.has(uuid)) return

    const menu = this.Menus.get(uuid)

    if (!menu) return

    if (menu?.active) return

    // @ts-ignore
    menu.active = true
    this.actualMenu = menu
    this.actualMenu.listChoices = []

    let ii: number = 0

    for (const item of this.actualMenu.items) {
      if (item.type === MenuItemTypesE.LIST) {
        this.actualMenu.listChoices.push({
          itemID: ii,
          actualChoice: 0,
          maxChoices: item.choices?.length! - 1,
        })
      }
      ii++
    }

    ii = 0

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
