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

//
// ! This file needs a big refactor
//

class MenuService {
  private KEYS: KeyMapping[]
  private keyInterval: number
  private Menus: Map<string, Menu>
  private actualMenu: Menu | null
  private actualIndex: number
  private activeCheckboxs: number[]

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
    this.activeCheckboxs = []

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
          item.actualChoice.index--
        }

        if (key === KeysTypesE.RIGHT) {
          item.actualChoice.index++
        }

        if (item.actualChoice.index > item.maxChoices) {
          return (item.actualChoice.index = item.maxChoices)
        }

        if (item.actualChoice.index < 0) {
          return (item.actualChoice.index = 0)
        }

        if (this.actualMenu.items[this.actualIndex].onChange) {
          this.actualMenu.items[this.actualIndex].onChange!(
            // @ts-ignore
            this.actualMenu.items[this.actualIndex].choices[
              item.actualChoice.index
            ]
          )
        }

        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEventsE.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            choiceIndex: item.actualChoice.index,
            type: MenuItemTypesE.LIST,
          },
        })
      }
    }

    if (key === KeysTypesE.RETURN) {
      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemTypesE.CHECKBOX
      ) {
        this.activeCheckboxs.includes(this.actualIndex)
          ? (this.activeCheckboxs = this.activeCheckboxs.filter(
              (element) => element !== this.actualIndex
            ))
          : this.activeCheckboxs.push(this.actualIndex)

        if (this.actualMenu.items[this.actualIndex].onChange) {
          this.actualMenu.items[this.actualIndex].onChange!(
            // @ts-ignore
            {
              id: this.actualMenu.items[this.actualIndex].id,
              label: this.actualMenu.items[this.actualIndex].label,
              checked: this.activeCheckboxs.includes(this.actualIndex),
            }
          )
        }

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

      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemTypesE.BUTTON
      ) {
        if (this.actualMenu.items[this.actualIndex].onClick) {
          this.actualMenu.items[this.actualIndex].onClick!()
        }
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
      return message
    }

    const uuid = Utils.uuid('MEDIUM')

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
          actualChoice: {
            id: item.choices![0].id,
            index: 0,
          },
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
