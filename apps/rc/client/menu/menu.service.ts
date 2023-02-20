import { EventsService } from '@events/events.service'
import {
  KeyMapping,
  Keys,
  KeysTypes,
  Menu,
  MenuEvents,
  MenuItemEnum,
  NuiAPPS,
} from '@nx/types'
import { Utils } from '@shared/utils/misc'
import { MenuUtils } from './menu.utils'

//
// ! This file needs a big refactor
//

class _MenuService {
  private KEYS: KeyMapping[]
  private keyInterval: number
  private Menus: Map<string, Menu>
  private actualMenu: Menu | null
  private actualIndex: number
  private activeCheckboxs: { cid: number; mid: string }[]

  constructor() {
    this.KEYS = [
      {
        key: 'BACK',
        description: 'Key BACK',
        command: 'NX::keyBack',
        handler: () => this.keyHandler('BACK'),
      },
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
    if (this.actualMenu === null || new Date().getTime() - this.keyInterval < 7)
      return

    this.keyInterval = new Date().getTime()

    if (key == Keys.BACK && this.actualMenu !== null) {
      this.hideMenu(this.actualMenu.uuid!)
    }

    if (key === Keys.UP || key === Keys.DOWN) {
      if (key === Keys.UP) {
        this.actualIndex--
      }

      if (key === Keys.DOWN) {
        this.actualIndex++
      }

      if (key === Keys.UP && this.actualIndex < 0) {
        return (this.actualIndex = 0)
      }

      if (
        key === Keys.DOWN &&
        this.actualIndex > this.actualMenu.itemsLength!
      ) {
        return (this.actualIndex = this.actualMenu.itemsLength!)
      }

      if (this.actualMenu.items[this.actualIndex].type === 'SEPARATOR') {
        let i = this.actualIndex

        key === Keys.DOWN ? i++ : i--

        const nextItem = this.actualMenu.items[i]

        // ! Check all the next items cause nextItem can be separator too !

        if (!nextItem) return

        key === Keys.DOWN ? this.actualIndex++ : this.actualIndex--
      }

      EventsService.emitNuiEvent({
        app: NuiAPPS.MENU,
        method: MenuEvents.KEY_PRESSED,
        data: {
          key,
          index: this.actualIndex,
        },
      })
      return
    }

    if (key === Keys.LEFT || key === Keys.RIGHT) {
      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemEnum.SLIDER
      ) {
        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEvents.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            type: MenuItemEnum.SLIDER,
          },
        })
      }

      if (this.actualMenu.items[this.actualIndex].type === MenuItemEnum.LIST) {
        const item = this.findItemChoices(this.actualIndex)

        if (key === Keys.LEFT) {
          item.actualChoice.index--
        }

        if (key === Keys.RIGHT) {
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
          method: MenuEvents.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            choiceIndex: item.actualChoice.index,
            type: MenuItemEnum.LIST,
          },
        })
      }
    }

    if (key === Keys.RETURN) {
      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemEnum.CHECKBOX
      ) {
        const isChecked = this.isCheckBoxChecked()

        if (isChecked) {
          this.activeCheckboxs = this.activeCheckboxs.filter(
            (element) => element.cid !== this.actualIndex
          )
        } else {
          this.activeCheckboxs.push({
            cid: this.actualIndex,
            // @ts-ignore
            mid: this.actualMenu.uuid,
          })
        }

        if (this.actualMenu.items[this.actualIndex].onChange) {
          this.actualMenu.items[this.actualIndex].onChange!(
            // @ts-ignore
            {
              id: this.actualMenu.items[this.actualIndex].id,
              label: this.actualMenu.items[this.actualIndex].label,
              checked: isChecked,
            }
          )
        }

        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEvents.KEY_PRESSED,
          data: {
            key,
            index: this.actualIndex,
            type: MenuItemEnum.CHECKBOX,
          },
        })
      }

      if (
        this.actualMenu.items[this.actualIndex].type === MenuItemEnum.BUTTON
      ) {
        if (this.actualMenu.items[this.actualIndex].onClick) {
          this.actualMenu.items[this.actualIndex].onClick!()
        }
      }
    }
  }

  private isCheckBoxChecked() {
    const element = this.activeCheckboxs.find((element) => {
      element.cid === this.actualIndex && element.mid === this.actualMenu?.uuid
    })

    if (element) return true

    return false
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
      method: MenuEvents.HIDE_MENU,
    })
  }

  public showMenu(uuid: string) {
    if (!this.Menus.has(uuid)) return
    this.actualIndex = 0

    const menu = this.Menus.get(uuid)

    if (!menu) return

    if (menu?.active) return

    // @ts-ignore
    menu.active = true
    this.actualMenu = menu
    this.actualMenu.listChoices = []

    let ii: number = 0

    for (const item of this.actualMenu.items) {
      if (item.type === MenuItemEnum.LIST) {
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
      method: MenuEvents.CREATE_MENU,
      data: menu,
    })

    for (const checkbox of this.activeCheckboxs) {
      if (checkbox.mid === this.actualMenu.uuid) {
        EventsService.emitNuiEvent({
          app: NuiAPPS.MENU,
          method: MenuEvents.KEY_PRESSED,
          data: {
            key: Keys.RETURN,
            index: checkbox.cid,
            type: MenuItemEnum.CHECKBOX,
          },
        })
      }
    }
  }
}

const MenuService = new _MenuService()
export { MenuService }
